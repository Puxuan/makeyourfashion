import React from 'react';
import { FABButton, Icon } from 'react-mdl';
import Dialog from 'material-ui/Dialog';

const { func, bool, node } = React.PropTypes;

class Modal extends React.Component {
  static propTypes = {
    onCloseModal: func.isRequired,
    open: bool,
    children: node.isRequired,
    hideClose: bool,
  }

  static defaultProps = {
    open: false,
    hideClose: false,
  }

  render() {
    const { onCloseModal, open, children, hideClose } = this.props;
    return (
      <Dialog
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        className="modal" onRequestClose={onCloseModal} open={open} autoScrollBodyContent
      >
        {
          !hideClose ? <FABButton onClick={onCloseModal} className="closemodal" mini colored>
            <Icon name="close" />
          </FABButton> : null
        }
        { children }
      </Dialog>
    );
  }
}

export default Modal;
