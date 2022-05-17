const phonesRouter = require('express').Router();
const Phone = require('../models/Phone');
// const jwt = require('jsonwebtoken');

// // Get token
// const getToken = req => {
//   const authorization = req.get('authorization');
//   if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7);
//   }
//   return null;
// }

// Getting all smartphones
phonesRouter.get('/', async (request, response) => {
  const result = await Phone.find({});
  response.json(result);
})

// Getting single smathphone
phonesRouter.get('/:id', async (request, response) => {
  const result = await Phone.findById(request.params.id);
  response.json(result);
})

// Adding new phone
phonesRouter.post('/', async (request, response) => {
  const { name, processor, camera, battery, price, img } = request.body;

  const existingPhone = await Phone.findOne({ name });

  if(existingPhone){
    return response.status(400).json({ error: 'Smartphone already exists' });
  }

  const phoneObject = new Phone({
    name,
    processor,
    camera,
    battery,
    price,
    img
  })

  const result = await phoneObject.save();
  response.status(201).json(result);
});

// Update single phone
phonesRouter.put('/:id', async (request, response) => {
  const { name, processor, camera, battery, price, img } = request.body;

  const newObject = {
    name,
    processor,
    camera,
    battery,
    price,
    img
  };

  const updatedPhone = await Phone.findByIdAndUpdate(request.params.id, newObject, { new: true});
  response.json(updatedPhone);
})

// Delete single smartphone
phonesRouter.delete('/:id', async (request, response) => {
  await Phone.findByIdAndRemove(request.params.id);
  response.status(204).end();
})

module.exports = phonesRouter;