import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Accordion extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '',
  }

  handleClickTitle = (e) => {
    e.preventDefault();
    this.props.onToggle();
  }

  render() {
    const { children, title, open } = this.props;
    return (
      <Paper style={{ marginBottom: '20px' }}>
        <div className="paper-title">
          <a href="" style={{ textDecoration: 'none', color: '#000' }} onClick={this.handleClickTitle}>{title}</a>
        </div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {
            open ? [<div key="item" className="paper-content">
              {children}
            </div>] : []
          }
        </ReactCSSTransitionGroup>
      </Paper>
    );
  }
}
