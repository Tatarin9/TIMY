import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Layout from './features/Layout/Layout';
import Kanban from './features/Kanban/Kanban';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
                <Layout />
        </BrowserRouter>
    );
  }
}

export default App;
