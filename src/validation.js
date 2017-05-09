export function validateOrder(order) {
  const errors = {};
  if (order.detail.qty <= 0) {
    errors.qty = '请选择至少一件商品';
  }
  if (order.detail.productId === undefined || order.detail.productId === null) {
    errors.productId = '请选择产品';
  }
  if (order.detail.size === undefined || order.detail.size === null) {
    errors.size = '请选择尺码';
  }
  return errors;
}

const EMAIL_REGEX = /\S+@\S+\.\S+/;

export function validateEmail(email) {
  if (!email) {
    return '请输入电子邮件';
  } else if (!EMAIL_REGEX.test(email)) {
    return '请使用正确电子邮件格式';
  }
  return null;
}

export function validateName(name) {
  if (!name) {
    return '请输入姓名';
  }

  return null;
}

export function validateAddress(address) {
  if (!address) {
    return '请输入地址';
  }

  return null;
}

const PHONE_REGEX = /\d/;

export function validatePhone(phone) {
  if (!phone) {
    return '请输入电话号码';
  } else if (!PHONE_REGEX.test(phone)) {
    return '请使用正确电话号码格式';
  }

  return null;
}

export function validateZipcode(zipcode) {
  if (!zipcode) {
    return '请输入邮编';
  } else if (zipcode.length !== 6) {
    return '请使用正确邮编格式';
  }

  return null;
}

export function validateOrderWhenPresent(order) {
  const errors = {};
  if (order.qty <= 0) {
    errors.qty = '请选择至少一件商品';
  }

  return errors;
}
