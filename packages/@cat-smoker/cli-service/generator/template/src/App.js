import React from 'react';
import Header from './components/Header'
import './index.css';
import BasicLayout from './layout/BasicLayout';

function App() {
  return (
    <div className="App">
      <BasicLayout>
        <Header></Header>
      </BasicLayout>
    </div>
  );
}

export default App;