// @flow
/* eslint-disable react/no-string-refs */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-mdl';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  RECT_WIDTH,
  RECT_HEIGHT,
} from './consts';
import { setMode } from '../../action';

function resizeImage() {
  const canvas = document.querySelector('canvas');
  // const context = canvas.getContext('2d');
  const resizedCanvas = document.createElement('canvas');
  const resizedContext = resizedCanvas.getContext('2d');
  resizedCanvas.height = '200';
  resizedCanvas.width = '200';

  resizedContext.drawImage(canvas, 0, 0, 200, 200);
  return resizedCanvas.toDataURL();
}

class CreateShirtCanvas extends React.Component {
  static defaultProps = {
    editable: true,
  }
  state = {
    image: null,
  }

  componentDidMount() {
    const spec = this.props.specs.byIds[this.props.currentDesign.detail.productId];
    // FIXME: change to bigUrl
    if (spec) {
      const image = new window.Image();
      image.src = (spec.pics.find(pic => pic.id === this.props.activeImageId)
        || spec.pics[0]).largeUrl;
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        this.setState({
          image,
        });
      };
    }
    this.lineX.hide();
    this.lineY.hide();
  }

  componentWillReceiveProps(nextProps) {
    const newProduct = nextProps.specs.byIds[nextProps.currentDesign.detail.productId] || {};
    if (newProduct && nextProps.activeImageId !== this.props.activeImageId) {
      const image = new window.Image();
      // FIXME: change to bigUrl
      image.src = (newProduct.pics.find(pic => pic.id === nextProps.activeImageId)
        || newProduct.pics[0]).largeUrl;
      image.onload = () => {
        this.setState({
          image,
        });
      };
    }
  }

  generateImage() {
    this.props.setMode(false);
    this.rect.hide();
    this.refs.layer.draw();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(resizeImage());
      }, 500);
    });
  }

  handlLayerChange = () => {
    this.refs.layer.draw();
  }

  handleEditClick = (e) => {
    e.preventDefault();
    this.props.setMode(true);

    this.rect.show();
    this.refs.layer.draw();
  }

  handleViewClick = (e) => {
    e.preventDefault();
    this.props.setMode(false);
    this.rect.hide();
    this.refs.layer.draw();
  }

  handleDragEnd = () => {
    window.setTimeout(() => {
      this.lineX.hide();
      this.lineY.hide();
      this.refs.layer.draw();
    }, 1000);
  }

  handleDrag = ({ x, y, width, height }) => {
    if (Math.round(x) === Math.round(RECT_WIDTH / 2)
      || Math.round(x + (width / 2)) === Math.round(RECT_WIDTH / 2)
      || Math.round(x + width) === Math.round(RECT_WIDTH / 2)) {
      this.lineX.show();
    } else {
      this.lineX.hide();
    }

    if (Math.round(y) === Math.round(RECT_HEIGHT / 2)
      || Math.round(y + (height / 2)) === Math.round(RECT_HEIGHT / 2)
      || Math.round(y + height) === Math.round(RECT_HEIGHT / 2)) {
      this.lineY.show();
    } else {
      this.lineY.hide();
    }
  }

  render() {
    const currentDesign = this.props.currentDesign;
    const { designs, texts } = currentDesign;
    const lineColor = 'white';
    return (
      <div id="create-shirt-canvas">
        <Button onClick={this.handleEditClick} className={this.props.editable ? 'activetab tab' : 'tab'} primary>编辑</Button>
        <Button onClick={this.handleViewClick} className={!this.props.editable ? 'activetab tab' : 'tab'} primary>预览</Button>
        {
          (() => {
            if (typeof window === 'undefined') {
              return <div />;
            }
            const Layer = require('react-konva').Layer;
            const Image = require('react-konva').Image;
            const Stage = require('react-konva').Stage;
            const Rect = require('react-konva').Rect;
            const Design = require('./Design').default;
            const Text = require('./Text').default;
            const Group = require('react-konva').Group;
            const Line = require('react-konva').Line;
            return (
              <Stage
                x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_WIDTH}
              >
                <Layer ref="layer">
                  <Image width={CANVAS_WIDTH} height={CANVAS_HEIGHT} image={this.state.image} />
                  <Group
                    x={(CANVAS_WIDTH - RECT_WIDTH) / 2}
                    y={(CANVAS_HEIGHT - RECT_HEIGHT) / 2}
                    width={RECT_WIDTH}
                    height={RECT_HEIGHT}
                  >
                    <Rect
                      strokeWidth={1}
                      x={0}
                      y={0}
                      width={RECT_WIDTH}
                      height={RECT_HEIGHT}
                      ref={(r) => { this.rect = r; }}
                      stroke={lineColor}
                    />
                    {
                      (designs.byPics[this.props.activeImageId] || []).map(id => <Design
                        key={id}
                        onDragEnd={this.handleDragEnd}
                        onDrag={this.handleDrag}
                        offsetX={(CANVAS_WIDTH - RECT_WIDTH) / 2}
                        offsetY={(CANVAS_HEIGHT - RECT_HEIGHT) / 2}
                        editible={this.props.editable}
                        onChangeLayer={this.handlLayerChange} design={designs.byIds[id]}
                      />)
                    }
                    {
                      (texts.byPics[this.props.activeImageId] || []).map(id => <Text
                        onDragEnd={this.handleDragEnd}
                        onDrag={this.handleDrag}
                        key={id}
                        editible={this.props.editable}
                        onChangeLayer={this.handlLayerChange} text={texts.byIds[id]}
                      />)
                    }
                  </Group>
                  <Line
                    ref={(r) => { this.lineX = r; }}
                    points={[CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT]}
                    stroke={lineColor}
                    strokeWidth={1}
                  />
                  <Line
                    ref={(r) => { this.lineY = r; }}
                    points={[0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2]}
                    stroke={lineColor}
                    strokeWidth={1}
                  />
                </Layer>
              </Stage>
            );
          })()
        }
      </div>
    );
  }
}

export default connect(state => ({
  currentDesign: state.currentDesign,
  activeImageId: state.ui.createOrder.activeImageId,
  specs: state.entities.specs,
  editable: state.ui.createOrder.editable,
}), dispatch => ({
  setMode(mode) {
    dispatch(setMode(mode));
  },
}), null, { withRef: true })(CreateShirtCanvas);
/* eslint-enable react/no-string-refs */
