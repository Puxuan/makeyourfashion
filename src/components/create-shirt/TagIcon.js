import React from 'react';
import Chip from 'material-ui/Chip';
import { blue300 } from 'material-ui/styles/colors';

const { func, string, node, bool, number, oneOfType } = React.PropTypes;

export default class TagIcon extends React.Component {
  static propTypes = {
    value: oneOfType([string, number]).isRequired,
    onClick: func.isRequired,
    children: node.isRequired,
    isActive: bool,
  }

  static defaultProps = {
    isActive: false,
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(this.props.value);
  }

  render() {
    return <Chip backgroundColor={this.props.isActive ? blue300 : undefined} style={{ marginRight: '10px' }} onClick={this.handleClick}>{this.props.children}</Chip>;
  }
}
