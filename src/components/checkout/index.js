import React from 'react';
import { Grid, Cell } from 'react-mdl';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import AddressForm from './AddressForm';
import CartDetail from './CartDetail';
import Accordion from '../Accordion';

export default class Checkout extends React.Component {
  state = {
    step: 0,
    isAddressFormOpen: true,
    isPaymentFormOpen: false,
  }

  handleSaveAddress = () => {
    this.setState({
      step: 1,
      isAddressFormOpen: false,
      isPaymentFormOpen: true,
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
                <a href="">支付宝支付</a>
                <a href="">微信支付</a>
              </div>
            </Accordion>
          </Cell>
          <Cell col={4}>
            <CartDetail />
          </Cell>
        </Grid>
      </div>
    );
  }
}
