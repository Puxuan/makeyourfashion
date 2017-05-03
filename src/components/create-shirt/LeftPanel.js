// @flow
import React from 'react';
import { FABButton, Icon, List, ListItem } from 'react-mdl';
import { connect } from 'react-redux';
import {
  toggleProductModel,
  toggleDesignModel,
  toggleAddTextPanel,
} from '../../action';
import TextSettingsPanel from './TextSettingsPanel';

const { func, object } = React.PropTypes;

class LeftPanel extends React.Component {
  static propTypes = {
    toggleProductModel: func.isRequired,
    toggleDesignModel: func.isRequired,
    specs: object.isRequired,
    currentDesign: object.isRequired,
    toggleAddTextPanel: func.isRequired,
  }

  handleSelectProduct = (e) => {
    e.preventDefault();
    this.props.toggleProductModel();
  }

  handleSelectDesign = (e) => {
    e.preventDefault();
    this.props.toggleDesignModel();
  }

  handleAddText = (e) => {
    e.preventDefault();
    this.props.toggleAddTextPanel();
  }

  render() {
    const specs = this.props.specs.byIds[this.props.currentDesign.detail.productId];
    return (
      <div>
        <p className="productname">{specs ? specs.name : '请选择产品'}</p>
        <List>
          <ListItem>
            <div className="label">
              <FABButton onClick={this.handleSelectProduct} mini name="select-product">
                <Icon name="collections" />
              </FABButton>
              <label htmlFor="select-product"> 选择产品 </label>
            </div>
          </ListItem>
          <ListItem>
            <div className="label">
              <FABButton onClick={this.handleSelectDesign} mini name="select-design">
                <Icon name="insert_photo" />
              </FABButton>
              <label htmlFor="select-design"> 选择设计 </label>
            </div>
          </ListItem>
          <ListItem>
            <div className="label">
              <FABButton onClick={this.handleAddText} mini name="add-text">
                <Icon name="title" />
              </FABButton>
              <label htmlFor="add-text"> 添加文字 </label>
            </div>
          </ListItem>
        </List>
        <br />
        <TextSettingsPanel />
      </div>
    );
  }
}

export default connect(state => ({
  specs: state.entities.specs,
  currentDesign: state.currentDesign,
}), dispatch => ({
  toggleProductModel() {
    dispatch(toggleProductModel());
  },
  toggleDesignModel() {
    dispatch(toggleDesignModel);
  },
  toggleAddTextPanel() {
    dispatch(toggleAddTextPanel);
  },
}))(LeftPanel);
