import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TransactionList from './components/transactionList/TransactionList';
import "./App.css";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={TransactionList} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
