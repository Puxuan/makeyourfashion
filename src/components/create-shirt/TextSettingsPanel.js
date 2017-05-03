// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button, IconButton } from 'react-mdl';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { range } from 'lodash';
import CirclePicker from 'react-color/lib/components/circle/Circle';
import { addTextToPic, toggleAddTextPanel } from '../../action';
import { fontList, COLORS } from './consts';
import Modal from '../Modal';

const { bool, func, number } = React.PropTypes;
const activeIcon = { border: '1px solid red' };
const formField = { marginBottom: '10px' };

class TextSettingsPanel extends React.Component {
  static propTypes = {
    showTextSettings: bool,
    activeImageId: number,
    addTextToPic: func.isRequired,
    toggleAddTextPanel: func.isRequired,
  }

  static defaultProps = {
    activeImageId: null,
  }

  static defaultProps = {
    showTextSettings: false,
  }

  state = {
    text: '',
    fontSize: 30,
    fontFamily: 'Arial',
    color: '#000',
    align: 'center',
    bold: false,
    italic: false,
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  handleChangeText = (e) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        text: e.target.value,
      });
    }
  }

  handleChangeFont = (event, index, fontFamily) => {
    this.setState({
      fontFamily,
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.addTextToPic({
      picId: this.props.activeImageId,
      text: this.state.text,
      x: 25,
      y: 625,
      fontSize: this.state.fontSize,
      fontFamily: this.state.fontFamily,
      color: this.state.color,
      width: 950,
      align: this.state.align,
      bold: this.state.bold,
      italic: this.state.italic,
    });
    this.setState({
      text: '',
    });
    this.props.toggleAddTextPanel();
  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.toggleAddTextPanel();
  }

  handleChangeFontSize = (a, b, fontSize) => {
    this.setState({
      fontSize: +fontSize,
    });
  }

  handleChangeColor = (color) => {
    this.setState({
      color: color.hex,
    });
  }

  handleAlignCenter = (e) => {
    e.preventDefault();
    this.setState({
      align: 'center',
    });
  }

  handleAlignLeft = (e) => {
    e.preventDefault();
    this.setState({
      align: 'left',
    });
  }

  handleAlignRight = (e) => {
    e.preventDefault();
    this.setState({
      align: 'right',
    });
  }

  handleBoldSelect= (e) => {
    e.preventDefault();
    this.setState({
      bold: !this.state.bold,
    });
  }

  handleItalicSelect = (e) => {
    e.preventDefault();
    this.setState({
      italic: !this.state.italic,
    });
  }

  render() {
    return (
      <Modal onCloseModal={this.handleClose} open={this.props.showTextSettings}>
        <form onSubmit={this.handleClick}>
          <TextField
            ref={(r) => { this.input = r ? r.inputRef : null; }}
            floatingLabelText="请输入文字"
            value={this.state.text}
            onChange={this.handleChangeText}
          />
          <div>
            <SelectField
              style={{ width: 200 }}
              floatingLabelText="字体大小"
              value={this.state.fontSize}
              onChange={this.handleChangeFontSize}
            >
              {
                range(30, 46).map(n => <MenuItem key={n} value={n} primaryText={n} />)
              }
            </SelectField>
          </div>
          <div>
            <SelectField
              style={{ width: 200, fontFamily: this.state.fontFamily }}
              floatingLabelText="字体"
              value={this.state.fontFamily}
              onChange={this.handleChangeFont}
            >
              {
                fontList.map(n =>
                  <MenuItem key={n} value={n} innerDivStyle={{ fontFamily: n }} primaryText={n} />,
                )
              }
            </SelectField>
          </div>
          <label htmlFor="align-select">对齐</label>
          <div style={formField} id="align-select">
            <IconButton style={this.state.align === 'center' ? activeIcon : {}} onClick={this.handleAlignCenter} name="format_align_center" />
            <IconButton style={this.state.align === 'left' ? activeIcon : {}} onClick={this.handleAlignLeft} name="format_align_left" />
            <IconButton style={this.state.align === 'right' ? activeIcon : {}} onClick={this.handleAlignRight} name="format_align_right" />
          </div>
          <label htmlFor="format-select">字体格式</label>
          <div style={formField} id="format-select">
            <IconButton style={this.state.bold ? activeIcon : {}} onClick={this.handleBoldSelect} name="format_bold" />
            <IconButton style={this.state.italic ? activeIcon : {}} onClick={this.handleItalicSelect} name="format_italic" />
          </div>
          <label htmlFor="color-picker">颜色</label>
          <CirclePicker
            id="color-picker"
            colors={COLORS}
            color={this.state.color}
            onChange={this.handleChangeColor}
            width="100%"
            triangle="hide"
          />
          <div>
            <Button
              type="submit"
              style={{ marginTop: '20px' }}
              raised colored ripple primary
            >添加</Button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    showTextSettings: state.ui.createOrder.showTextSettings,
    activeImageId: state.ui.createOrder.activeImageId,
  }),
  dispatch => ({
    addTextToPic(text) {
      dispatch(addTextToPic(text));
    },
    toggleAddTextPanel() {
      dispatch(toggleAddTextPanel);
    },
  }),
)(TextSettingsPanel);
