import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-mdl';
import AutoComplete from 'material-ui/AutoComplete';
import { toggleDesignModel, addDesignToPic, fetchDesigns } from '../../action';
import Modal from '../Modal';
import TagIcon from './TagIcon';

const { func, object, number } = React.PropTypes;

class DesignCardComponent extends React.Component {
  static propTypes = {
    addDesignToPic: func.isRequired,
    toggleDesignModel: func.isRequired,
    design: object.isRequired,
    activeImageId: number.isRequired,
  }
  handleDesignSelect = () => {
    this.props.addDesignToPic({
      designId: this.props.design.id,
      picId: this.props.activeImageId,
      height: 500,
      width: 500,
      x: 250,
      y: 625,
      rotation: 0,
    });
    this.props.toggleDesignModel();
  }

  render() {
    return (
      <Card
        onClick={this.handleDesignSelect}
        shadow={0}
        className="designcard"
        style={{ background: `url(${this.props.design.imgUrl}) center / cover` }}
      />
    );
  }
}

const DesignCard = connect(state => ({
  activeImageId: state.ui.createOrder.activeImageId,
}), dispatch => ({
  addDesignToPic(order) {
    dispatch(addDesignToPic(order));
  },
  toggleDesignModel() {
    dispatch(toggleDesignModel);
  },
}))(DesignCardComponent);

@connect(state => ({
  open: state.ui.createOrder.isDesignModelOpen,
  tags: state.entities.tags,
  designs: state.entities.designs,
}), dispatch => ({
  fetchDesigns() {
    dispatch(fetchDesigns());
  },
  toggleDesignModel() {
    dispatch(toggleDesignModel);
  },
}))
export default class SelectDesign extends React.Component {
  state = {
    query: '',
  }

  componentDidMount() {
    this.props.fetchDesigns();
  }

  handleToggleDesignModel = (e) => {
    this.props.toggleDesignModel();
  }

  handleTagClick = (v) => {
    this.setState({
      query: v,
    });
  }

  handleSearchChange = (v) => {
    this.setState({
      query: v,
    });
  }

  render() {
    let designIds;
    if (this.state.query) {
      const selecedTag = Object.values(this.props.tags.byIds)
        .find(tag => tag.name === this.state.query);
      designIds = selecedTag ? this.props.designs.byTags[selecedTag.id] : [];
    } else {
      designIds = this.props.designs.byPopularity;
    }

    return (
      <Modal onCloseModal={this.handleToggleDesignModel} open={this.props.open}>
        <div style={{ display: 'flex' }}>
          {this.props.tags.allIds.map((id) => {
            const tag = this.props.tags.byIds[id];
            return (
              <TagIcon
                onClick={this.handleTagClick}
                data-tagid={tag.id}
                value={tag.name} key={id}
              >
                {tag.name}
              </TagIcon>
            );
          })}
        </div>
        <div>
          <AutoComplete
            floatingLabelText="搜索"
            filter={AutoComplete.caseInsensitiveFilter}
            onUpdateInput={this.handleSearchChange}
            searchText={this.state.query}
            dataSource={this.props.tags.allIds.map(id => this.props.tags.byIds[id])}
            dataSourceConfig={{
              text: 'name',
              value: 'id',
            }}
          />
        </div>
        <div className="flexlist">
          {designIds.map(id => <DesignCard
            key={id}
            design={this.props.designs.byIds[id]}
          />)}
        </div>
      </Modal>
    );
  }
}
