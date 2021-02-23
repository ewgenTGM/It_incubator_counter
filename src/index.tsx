import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

ReactDOM.render(
    <React.StrictMode>
      <App
          initialMinValue={ 3 }
          initialMaxValue={ 7 }
          globalMinValue={ 0 }
          globalMaxValue={ 15 }/>
    </React.StrictMode>,
    document.getElementById( 'root' )
);