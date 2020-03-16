import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import './index.css';
import * as serviceWorker from './serviceWorker';
  
class App extends Component {
  render() {
    return (<Game />);
  }
}
  
ReactDOM.render(
  <App />, document.getElementById('root')
);
  
serviceWorker.unregister();
