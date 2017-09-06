import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from '../components/Editor';
import { get } from '../util/http';
import Ws from '../util/WebSocket';
import eventhub from '../util/eventhub';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      socket: null,
      connected: false
    };

    this.resizeTimeout = null;
    this.editors = {};

    this.fetchGames().then(streams => {
      this.createSocket();
      this.setState({ streams: streams || [] });
    });

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      eventhub.emit('editor-resize');
    }, 500);
  }

  fetchGames() {
    if (this.props.state === undefined) {
      return get('/games/' + this.props.match.params.guid).catch(error => {
        this.setState({ notFoundText: "Can't fetch game..." });
      });
    } else {
      this.setState({ streams: this.props.location.state || [] });
      return Promise.resolve([]);
    }
  }

  createSocket() {
    this.setState({ socket: new Ws('ws://localhost:8081') });
    this.state.socket.listen(data => {
      this.editors[data.streams[0]].applyEdit(data);
    });
    this.state.socket.onDisconnect(() => {
      this.setState({ connected: false });
    });
    this.state.socket.onConnect(() => {
      this.setState({ connected: true });
      this.state.socket.post({
        type: 'info',
        streams: this.state.streams.map(stream => stream.id),
        game: this.props.match.params.guid
      });
    });
  }

  assignRef = (component, stream) => {
    this.editors[stream] = component;
  };

  render() {
    return (
      <div className="editors-container">
        <div className="editors">
          {this.state.streams.map(stream => (
            <Editor
              ref={component => this.assignRef(component, stream.id)}
              socket={this.state.socket}
              game={this.props.match.params.guid}
              stream={stream.id}
              connected={this.state.connected}
              height="100%"
              width="100%"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
