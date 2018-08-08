import React, { Component } from "react";
import "../../App.css";


class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.rowdata;
  }

  render() {
    return <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          Transaction {this.props.rowdata.account}
        </h1>
      </header>
      <div className="Details-align">
        <div className="Row-margin">
          <b>ACCOUNT : </b> {this.props.rowdata.account}
        </div>
        <div className="Row-margin">
          <b>ACCOUNT NAME : </b> {this.props.rowdata.accountName}
        </div>
        <div className="Row-margin">
          <b>CURRENCY : </b>
          {this.props.rowdata.currencyCode}
        </div>
        <div className="Row-margin">
          <b>AMOUNT : </b>
          {this.props.rowdata.amount}
        </div>
        <div className="Row-margin">
          <b>TRANSACTION TYPE : </b>
          {this.props.rowdata.transactionType}
        </div>
        <div className="Row-margin">
          <button className="Account-link" onClick={this.props.ShowList}>
            Back To List
                    </button>
        </div>
      </div>
    </div>;
  }

}

export default TransactionDetails;