import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import {
  validateAddress,
  validateEmail,
  validatePhone,
  validateName,
  validateZipcode,
 } from '../../validation';

function isErrorPresent(errors) {
  return Object.values(errors).find(error => !!error);
}

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
    emailError: null,
    nameError: null,
    addressError: null,
    zipcodeError: null,
    phoneError: null,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      emailError: validateEmail(this.state.email),
      nameError: validateName(this.state.name),
      addressError: validateAddress(this.state.address),
      zipcodeError: validateZipcode(this.state.zipcode),
      phoneError: validatePhone(this.state.phone),
    };
    if (isErrorPresent(errors)) {
      this.setState(errors);
    } else {
      this.props.onNext({
        email: this.state.email,
        name: this.state.name,
        address: this.state.address,
        zipcode: this.state.zipcode,
        phone: this.state.phone,
      });
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleEmailBlur = (e) => {
    this.setState({
      emailError: validateEmail(e.target.value),
    });
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleNameBlur = (e) => {
    this.setState({
      nameError: validateName(e.target.value),
    });
  }

  handleAddressChange = (e) => {
    this.setState({
      address: e.target.value,
    });
  }

  handleAddressBlur = (e) => {
    this.setState({
      addressError: validateAddress(e.target.value),
    });
  }

  handleZipcodeChange = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
  }

  handleZipcodeBlur = (e) => {
    this.setState({
      zipcodeError: validateZipcode(e.target.value),
    });
  }

  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  handlePhoneBlur = (e) => {
    this.setState({
      phoneError: validatePhone(e.target.value),
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          floatingLabelText="电子邮箱"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onBlur={this.handleEmailBlur}
          errorText={this.state.emailError}
        />
        <br />
        <hr />
        <legend>邮寄地址：</legend>
        <TextField
          floatingLabelText="姓名"
          value={this.state.name}
          onChange={this.handleNameChange}
          onBlur={this.handleNameBlur}
          errorText={this.state.nameError}
        />
        <br />
        <TextField
          multiLine
          floatingLabelText="详细地址"
          value={this.state.address}
          onChange={this.handleAddressChange}
          onBlur={this.handleAddressBlur}
          errorText={this.state.addressError}
        />
        <br />
        <TextField
          floatingLabelText="邮政编码"
          value={this.state.zipcode}
          pattern="[0-9]{6}"
          onChange={this.handleZipcodeChange}
          onBlur={this.handleZipcodeBlur}
          errorText={this.state.zipcodeError}
        />
        <br />
        <TextField
          floatingLabelText="手机号码"
          value={this.state.phone}
          onChange={this.handlePhoneChange}
          onBlur={this.handlePhoneBlur}
          errorText={this.state.phoneError}
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
