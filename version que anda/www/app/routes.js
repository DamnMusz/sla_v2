import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Index from './components/Index';
import App from './components/App';

// <Route path="/conversation/:human" component={ConversationPane}></Route>

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Index}></Route>
    <Route path="/app" component={App}></Route>
  </Router>
), document.getElementById('main'))
