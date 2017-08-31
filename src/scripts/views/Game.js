import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from '../components/Editor';
import { get } from '../util/http';
import Ws from '../util/WebSocket';
import eventhub from '../util/eventhub';

let resizeTimeout;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      socket: null
    };

    this.fetchGames().then(streams => {
      this.createSocket();
      this.setState({ streams });
    });

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      eventhub.emit('editor-resize');
    }, 500);
  }

  fetchGames() {
    if (this.props.state === undefined) {
      return get('/games/' + this.props.match.params.guid).catch(error => {
        this.setState({ notFoundText: "Can't fetch game..." });
      });
    } else {
      this.setState({ streams: this.props.location.state });
      return Promise.resolve([]);
    }
  }

  createSocket() {
    this.setState({ socket: new Ws('ws://localhost:8081') });
    this.state.socket.onConnect(() => {
      this.state.socket.post({ type: 'info', streams: this.state.streams });
    });
  }

  render() {
    return (
      <div className="editors-container">
        <div className="editors">
          {this.state.streams.map(stream => (
            <Editor socket={this.state.socket} stream={stream.id} height="100%" width="100%" />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
