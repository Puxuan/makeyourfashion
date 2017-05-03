import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const style = {
  maxWidth: '800px',
};

function Checkout() {
  return (
    <Paper style={style} >
      <div className="paper-title">支付</div>
      <div className="paper-content">
        <TextField
          floatingLabelText="电子邮箱"
          hintText="您的电子邮箱"
        />
        <br />
        <hr />
        <legend>邮寄地址：</legend>
        <TextField
          floatingLabelText="姓名"
          hintText="您的姓名"
        />
        <br />
        <TextField
          multiLine
          floatingLabelText="详细地址"
          fullWidth
        />
        <br />
        <TextField
          floatingLabelText="邮政编码"
        />
        <br />
        <TextField
          floatingLabelText="手机号码"
          type="tel"
        />
        <br />
      </div>
    </Paper>
  );
}

export default Checkout;

