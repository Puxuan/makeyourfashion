import React from 'react';
import { Grid, Cell } from 'react-mdl';
import Paper from 'material-ui/Paper';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddressForm from './AddressForm';
import CartDetail from './CartDetail';
import Accordion from '../Accordion';
import { addAddress, clearCart } from '../../action';

class Checkout extends React.Component {
  static propTypes = {
    addAddress: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    step: 0,
    isAddressFormOpen: true,
    isPaymentFormOpen: false,
    isSummaryOpen: false,
    isSuccessOpen: false,
  }

  handleSaveAddress = (address) => {
    this.props.addAddress(address);
    this.setState({
      step: 1,
      isAddressFormOpen: false,
      isPaymentFormOpen: true,
      isSummaryOpen: false,
    });
  }

  handleToggleAddressForm = () => {
    this.setState({
      isAddressFormOpen: !this.state.isAddressFormOpen,
    });
  }

  handleTogglePaymentForm = () => {
    this.setState({
      isPaymentFormOpen: !this.state.isPaymentFormOpen,
    });
  }

  handleToggleSummary = () => {
    this.setState({
      isSummaryOpen: !this.state.isSummaryOpen,
    });
  }

  hanldePayment = (e) => {
    e.preventDefault();
    this.setState({
      step: 2,
      isAddressFormOpen: false,
      isPaymentFormOpen: false,
      isSummaryOpen: true,
    });
  }

  checkout = (e) => {
    e.preventDefault();
    this.setState({
      isSuccessOpen: true,
    });
    this.props.clearCart();
  }

  handleSuccessClose = () => {
    this.setState({
      isSuccessOpen: false,
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Grid>
          <Cell col={8}>
            <Stepper activeStep={this.state.step}>
              <Step>
                <StepLabel>填写邮寄地址</StepLabel>
              </Step>
              <Step>
                <StepLabel>填写支付信息</StepLabel>
              </Step>
              <Step>
                <StepLabel>下单</StepLabel>
              </Step>
            </Stepper>
          </Cell>
        </Grid>
        <Grid>
          <Cell col={8}>
            <Accordion
              open={this.state.isAddressFormOpen}
              onToggle={this.handleToggleAddressForm}
              title="邮寄信息"
            >
              <AddressForm onNext={this.handleSaveAddress} />
            </Accordion>
            <Accordion
              open={this.state.isPaymentFormOpen}
              onToggle={this.handleTogglePaymentForm}
              title="支付信息"
            >
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <a onClick={this.hanldePayment} href="">支付宝支付</a>
                <a href="">微信支付</a>
              </div>
            </Accordion>
            <Accordion
              open={this.state.isSummaryOpen}
              onToggle={this.handleToggleSummary}
              title="总结"
            >
              <CartDetail />
              <RaisedButton
                primary
                label="确认下单"
                onClick={this.checkout}
              />
            </Accordion>
          </Cell>
          <Cell col={4}>
            <Paper>
              <div>
                <div className="paper-title">购物车详情</div>
                <div className="paper-content">
                  <CartDetail />
                </div>
              </div>
            </Paper>
          </Cell>
        </Grid>
        <Snackbar
          open={this.state.isSuccessOpen}
          message="成功下单，即将跳转至主页"
          autoHideDuration={4000}
          onRequestClose={this.handleSuccessClose}
        />
      </div>
    );
  }
}

export default connect(null, dispatch => ({
  addAddress(address) {
    dispatch(addAddress(address));
  },
  clearCart() {
    dispatch(clearCart);
  },
}))(Checkout);
