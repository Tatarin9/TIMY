import React, { Component } from 'react';

import Layout from './features/Layout/Layout';
import Kanban from './features/Kanban/Kanban';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Kanban/>
        </Layout>
      </div>
    );
  }
}

export default App;
