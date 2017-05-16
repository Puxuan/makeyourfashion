import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'react-mdl';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CirclePicker from 'react-color/lib/components/circle/Circle';
import { range } from 'lodash';
import { toggleEditTextPanel, updateText, removeText } from '../../action';
import { fontList, COLORS } from './consts';

const { bool, string, func, object } = React.PropTypes;
const activeIcon = { border: '1px solid red' };
const formField = { marginBottom: '10px' };

class TextEditPanel extends React.Component {
  static propTypes = {
    editable: bool,
    activeTextId: string,
    toggleEditTextPanel: func.isRequired,
    updateText: func.isRequired,
    removeText: func.isRequired,
    texts: object.isRequired,
  }

  static defaultProps = {
    editable: true,
    activeTextId: null,
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
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      if (!e.target.value.length) {
        this.props.removeText(this.props.activeTextId);
      } else {
        this.props.updateText({
          ...this.props.texts[this.props.activeTextId],
          text: e.target.value,
        });
      }
    }
  }

  handleChangeFontSize = (event, index, size) => {
    this.props.updateText({
      ...this.props.texts[this.props.activeTextId],
      fontSize: +size,
    });
  }

  handleChangeFont = (event, index, fontFamily) => {
    this.props.updateText({
      ...this.props.texts[this.props.activeTextId],
      fontFamily,
    });
  }

  handleChangeColor = (color) => {
    this.props.updateText({
      ...this.props.texts[this.props.activeTextId],
      color: color.hex,
    });
  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.toggleEditTextPanel(false);
  }

  handleAlignCenter = (e) => {
    e.preventDefault();
    this.props.updateText({
      ...this.props.texts[this.props.activeTextId],
      align: 'center',
    });
  }

  handleAlignLeft = (e) => {
    e.preventDefault();
    this.props.updateText({
      ...this.props.texts[this.props.activeTextId],
      align: 'left',
    });
  }

  handleAlignRight = (e) => {
    e.preventDefault();
    this.props.updateText({
      ...this.props.texts[this.props.activeTextId],
      align: 'right',
    });
  }

  handleBoldSelect= (e) => {
    e.preventDefault();
    const text = this.props.texts[this.props.activeTextId];
    this.props.updateText({
      ...text,
      bold: !text.bold,
    });
  }

  handleItalicSelect = (e) => {
    e.preventDefault();
    const text = this.props.texts[this.props.activeTextId];
    this.props.updateText({
      ...text,
      italic: !text.italic,
    });
  }

  render() {
    const text = this.props.texts[this.props.activeTextId];
    if (!text || !this.props.editable) {
      return null;
    }
    return (
      <div>
        <TextField
          ref={(r) => { this.input = r ? r.inputRef : null; }}
          floatingLabelText="编辑文字"
          value={text.text}
          onChange={this.handleChangeText}
        />
        <div>
          <SelectField
            style={{ width: 200 }}
            floatingLabelText="字体大小"
            value={text.fontSize}
            onChange={this.handleChangeFontSize}
          >
            {
              range(30, 46).map(n => <MenuItem key={n} value={n} primaryText={n} />)
            }
          </SelectField>
        </div>
        <div>
          <SelectField
            style={{ width: 200, fontFamily: text.fontFamily }}
            floatingLabelText="字体"
            value={text.fontFamily}
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
          <IconButton style={text.align === 'center' ? activeIcon : {}} onClick={this.handleAlignCenter} name="format_align_center" />
          <IconButton style={text.align === 'left' ? activeIcon : {}} onClick={this.handleAlignLeft} name="format_align_left" />
          <IconButton style={text.align === 'right' ? activeIcon : {}} onClick={this.handleAlignRight} name="format_align_right" />
        </div>
        <label htmlFor="format-select">字体格式</label>
        <div style={formField} id="format-select">
          <IconButton style={text.bold ? activeIcon : {}} onClick={this.handleBoldSelect} name="format_bold" />
          <IconButton style={text.italic ? activeIcon : {}} onClick={this.handleItalicSelect} name="format_italic" />
        </div>
        <label htmlFor="color-picker">
          颜色
        </label>
        <CirclePicker
          id="color-picker"
          colors={COLORS}
          color={text.color}
          onChange={this.handleChangeColor}
          width="100%"
          triangle="hide"
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    activeTextId: state.ui.createOrder.activeTextId,
    editable: state.ui.createOrder.editable,
    texts: state.currentDesign.texts.byIds,
  }),
  dispatch => ({
    toggleEditTextPanel(payload) {
      dispatch(toggleEditTextPanel(payload));
    },
    updateText(payload) {
      dispatch(updateText(payload));
    },
    removeText(id) {
      dispatch(removeText(id));
    },
  }),
)(TextEditPanel);
