import React, { Component } from 'react';
import DynamicForm from './Form';
import './App.css'

class App extends Component {
  result = (values) => {
    console.log('result is', values);
  }

  render() {
    return (
      <DynamicForm onSubmit={this.result}/>
    );
  }
}

export default App;