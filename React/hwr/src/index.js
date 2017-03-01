import React from 'react';
import ReactDOM from 'react-dom';
import TournamentList from './pages/TournamentsList';
import Detail from './pages/Detail';
import './index.css';

ReactDOM.render(
  <TournamentList />,
  <Detail />,
  document.getElementById('root')
);
