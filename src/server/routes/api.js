import express from 'express';
import { getCatalog, getSpecs, getSpec, getDesigns } from '../client';

const router = express.Router();

router.get('/category', (req, res) => {
  getCatalog(1).then((categories) => {
    res.json(categories);
  }).catch((e) => {
    console.error(e.stack);
    res.json(e);
  });
});
router.get('/category/:id', (req, res) => {
  getCatalog(req.params.id)
    .then(categories => Promise.all(
      categories.map(category => getSpecs(category.id).then(products => ({
        category,
        products,
      }))),
    ).then(categoryList => categoryList.map(category => ({
      id: category.category.id,
      name: category.category.name,
      products: category.products,
    })))).then((retVal) => {
      res.json(retVal);
    }).catch((e) => {
      console.error(e.stack);
      res.json(e);
    });
});

router.get('/spec/:id', (req, res) => {
  getSpec(req.params.id).then((spec) => {
    res.json(spec);
  }).catch((e) => {
    console.error(e.stack);
    res.json(e);
  });
});

router.get('/designs', (req, res) => {
  getDesigns().then((designs) => {
    res.json(designs);
  }).catch((e) => {
    console.error(e.stack);
    res.json(e);
  });
});

export default router;
