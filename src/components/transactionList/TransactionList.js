import React, { Component } from "react";
import CheckBoxList from "../common/Checkboxlist";
import "../../App.css";
import transactionData from "../../data/data.json";
import TransactionDetail from "../transactionDetails/TransactionDetails";

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawdata: [],
            data: [],
            accountName: [],
            transactionType: [],
            showlist: true,
            rowdata: {},
            selectedAcType: [],
            selectedTType: []
        };
    }
    componentDidMount() {
        var data = transactionData;

        var uniqueAcName = [
            ...new Set(data.transactions.map(item => item.accountName))
        ];
        var uniqueTranType = [
            ...new Set(data.transactions.map(item => item.transactionType))
        ];
        this.setState({
            rawdata: data.transactions,
            data: data.transactions,
            accountName: uniqueAcName,
            transactionType: uniqueTranType
        });
    }

    onChange(name, values) {
        this.setState({ [name]: values });
        //    console.log(Object.keys(values));
        var keys = Object.keys(values);
        var filteredacName = keys.filter(function (key) {
            return values[key];
        });
        this.setState({ selectedAcType: filteredacName });

        this.GetFilteredData(filteredacName, this.state.selectedTType);
    }

    onChangeTT(name, values) {
        this.setState({ [name]: values });
        var keys = Object.keys(values);
        var filteredTT = keys.filter(function (key) {
            return values[key];
        });
        this.setState({ selectedTType: filteredTT });
        this.GetFilteredData(this.state.selectedAcType, filteredTT);
    }

    GetFilteredData(actype, ttype) {
        var fdata = [];
        var finaldata = [];
        if (actype.length <= 0 && ttype <= 0) {
            this.setState({ data: this.state.rawdata })
            return;
        }
        if (actype.length > 0) {
            for (var i = 0; i < actype.length; i++) {
                for (var j = 0; j < this.state.rawdata.length - 1; j++) {
                    if (this.state.rawdata[j].accountName === actype[i]) {
                        fdata.push(this.state.rawdata[j]);
                    }
                }
            }
            this.setState({ data: fdata });
        } else {
            fdata = this.state.rawdata;
        }

        if (ttype.length > 0) {
            for (i = 0; i < ttype.length; i++) {
                for (j = 0; j < fdata.length - 1; j++) {
                    if (fdata[j].transactionType === ttype[i]) {
                        finaldata.push(fdata[j]);
                    }
                }
            }
            this.setState({ data: finaldata });
        }
    }
    handleClick(item) {
        this.setState({ showlist: false, rowdata: item });
        //console.log(item);
    }

    render() {
        if (!this.state.showlist) {
            return (
                <TransactionDetail rowdata={this.state.rowdata} ShowList={() => this.setState({ showlist: true })} />
            );
        }
        return (
            <div className="App Align">
                <header className="App-header">
                    <h1 className="App-title">My Transactions</h1>
                </header>
                <div className="row Table-container">
                    <div className="col-md-4 Checkbox-align">
                        <div className="Filter-align">Filters</div>
                        <div className="Account-main">
                            <span className="AccountName">Account Name</span>
                            <CheckBoxList
                                onChange={values => this.onChange("actype", values)}
                                values={this.state.accountName}
                            />
                        </div>
                        <div className="Tranc-main">
                            <span className="TrancName">Transactions Type</span>
                            <CheckBoxList
                                onChange={values => this.onChangeTT("ttype", values)}
                                values={this.state.transactionType}
                            />
                        </div>
                    </div>
                    <div className="col-md-8 Main-table-align">
                        <table>
                            <tbody>
                                <tr>
                                    <th>ACCOUNT</th>
                                    <th>ACCOUNT NAME</th>
                                    <th>CURRENCY</th>
                                    <th>AMOUNT</th>
                                    <th>TRANSACTION TYPE</th>
                                </tr>

                                {this.state.data.map(
                                    function (obj, index) {
                                        return (
                                            <tr key={index}>
                                                <td >

                                                    <a className="Account-link Link"
                                                        href={null}
                                                        key={index}
                                                        onClick={() => this.handleClick(obj)}>
                                                        <u>
                                                            {" "}
                                                            {obj.account}
                                                        </u>
                                                    </a>
                                                </td>
                                                <td>{obj.accountName}</td>
                                                <td>{obj.currencyCode}</td>
                                                <td>{obj.amount}</td>
                                                <td>{obj.transactionType}</td>
                                            </tr>
                                        );
                                    }.bind(this)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransactionList;
