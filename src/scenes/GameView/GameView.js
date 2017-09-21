import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get } from '@/services/http';
import Ws from './components/WebSocket/WebSocket';
import Editor from './components/Editor/Editor';
import './GameView.scss';

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

    this.fetchGames().then(game => {
      this.createSocket();
      this.setState({ streams: Object.values(game.streams) || [] });
    });

    window.addEventListener('resize', this.resize);
    window.addEventListener('beforeunload', this.close);
  }

  componentWillUnmount() {
    this.close();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('beforeunload', this.close);
  }

  close() {
    if (this.state.socket) {
      this.state.socket.close();
    }
  }

  resize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      Object.values(this.editors || []).forEach(editor => {
        editor.resize();
      });
    }, 500);
  };

  fetchGames() {
    if (this.props.state === undefined) {
      return get(`/games/${this.props.match.params.guid}`).catch(() => {
        this.setState({ notFoundText: "Can't fetch game..." });
      });
    }
    this.setState({ streams: this.props.location.state || [] });
    return Promise.resolve(this.state.streams);
  }

  createSocket() {
    this.setState({ socket: new Ws('ws://localhost:8081') });
    this.state.socket.listen(data => {
      const streamId = data.streams[0];
      if (this.editors[streamId]) {
        this.editors[streamId].applyEdit(data);
      }
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
      <div class="editors-container">
        <div class="editors">
          {this.state.streams.map(stream => (
            <Editor
              ref={component => this.assignRef(component, stream.id)}
              socket={this.state.socket}
              game={this.props.match.params.guid}
              stream={stream.id}
              language={
                stream.language ? stream.language.languageName : 'javascript'
              }
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
