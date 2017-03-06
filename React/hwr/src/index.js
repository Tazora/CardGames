import React from 'react';
import ReactDOM from 'react-dom';
//import GamesList from './pages/GamesList';
//import Detail from './pages/Detail';
import GameContainer from './pages/GameContainer'
import './index.css';

ReactDOM.render(
  //<GamesList />,
  //<Detail />,
  <GameContainer gameid="8" />,
  document.getElementById('root')
);
