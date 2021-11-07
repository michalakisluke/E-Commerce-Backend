const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  console.log('===============');
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  console.log('===============');
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  console.log('===============');
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbNewTag) => res.status(200).json(dbNewTag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  console.log('===============');
  Tag.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  console.log('===============');
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbTagData => {
      if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id'});
      }
      res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;
