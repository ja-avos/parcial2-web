import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Tabla from './Tabla';
import {FormattedMessage, IntlProvider} from 'react-intl';
import msg_en from './translations/en.json';
import msg_es from './translations/es.json';

const messages = {
  'es': msg_es,
  'en': msg_en
};

const lang = navigator.language.split(/[-_]/)[0];

function App() {
  return (
    <div className="App">
      <IntlProvider locale={navigator.language} messages={messages[lang]}>
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt='logo' width='50px' height='50px'></img>
        <h1 className='display-4 text-dark'><FormattedMessage id='title' description='Movies' defaultMessage='Movies' /></h1>
      </header>
      <div className="app-content">
        <Tabla />
      </div>
      </IntlProvider>
    </div>
  );
}

export default App;