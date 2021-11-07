const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log('===============');
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  console.log('===============');
  Category.findOne({
    attributes: ['id', 'category_name'],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  console.log('===============');
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbNewCat) => res.status(200).json(dbNewCat))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  console.log('===============');
  Category.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCatData => {
      if (!dbCatData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCatData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  console.log('===============');
  Category.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbCatData => {
      if (!dbCatData) {
          res.status(404).json({ message: 'No category found with this id'});
      }
      res.json(dbCatData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;
