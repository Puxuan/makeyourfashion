import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

export default class AddressForm extends React.Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    name: '',
    address: '',
    zipcode: '',
    phone: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onNext();
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleAddressChange = (e) => {
    this.setState({
      address: e.target.value,
    });
  }

  handleZipcodeChange = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
  }

  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          floatingLabelText="电子邮箱"
          value={this.state.email}
          onChange={this.handleEmailChange}
          hintText="您的电子邮箱"
        />
        <br />
        <hr />
        <legend>邮寄地址：</legend>
        <TextField
          floatingLabelText="姓名"
          value={this.state.name}
          onChange={this.handleNameChange}
          hintText="您的姓名"
        />
        <br />
        <TextField
          multiLine
          floatingLabelText="详细地址"
          value={this.state.address}
          onChange={this.handleAddressChange}
        />
        <br />
        <TextField
          floatingLabelText="邮政编码"
          value={this.state.zipcode}
          pattern="[0-9]{5}"
          onChange={this.handleZipcodeChange}
        />
        <br />
        <TextField
          floatingLabelText="手机号码"
          value={this.state.phone}
          onChange={this.handlePhoneChange}
          type="tel"
        />
        <br />
        <div className="actionsection">
          <RaisedButton label="下一步" primary type="submit" />
        </div>
      </form>
    );
  }
}
