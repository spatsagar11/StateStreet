import React, { Component } from "react";

class CheckBoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.values.map((v, i) => {
      return this.setState({ [v]: false });
    });
  }

  onChange(key, value) {
    this.setState({ [key]: value }, state => {
      this.props.onChange(this.state);
    });
  }

  render() {
    return (
      <div className="list-group-item form-group">
        {this.props.values.map((value, i) => (
          <div className="checkbox" key={i}>
            <label>
              <input
                onChange={e => this.onChange(value, e.target.checked)}
                type="checkbox"
                value={this.state[value]}
              />
              {value}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default CheckBoxList;