import { combineReducers } from 'redux';
import products from './product';
import designs from './design';
import tags from './tag';
import categories from './category';
import subCategories from './subCategory';
import specs from './spec';

export default combineReducers({ products, designs, tags, categories, subCategories, specs });
