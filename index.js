/* eslint-disable consistent-return */
const express = require('express');
const faker = require('faker');
const _ = require('lodash');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const PORT = process.env.PORT || 5000;
app.use(express.static('public'));

app.get('/notify', (req, res) => {
  const urlLineNotification = 'https://notify-api.line.me/api/notify';
  const imageFile = 'https://images.freeimages.com/images/large-previews/389/mitze-1380778.jpg';

  request({
    method: 'POST',
    uri: urlLineNotification,
    header: {
      'Content-Type': 'multipart/form-data',
    },
    auth: {
      bearer: process.env.TOKEN,
    },
    form: {
      message: 'Send Image!',
      imageThumbnail: imageFile,
      imageFullsize: imageFile,
    },
  }, (err, httpResponse, body) => {
    if (err) {
      // console.log(err)
      res.send(err);
    } else {
      // console.log(body)
      res.send(body);
    }
  });
});
app.get('/address', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const { address } = faker;
      return {
        country: address.country(),
        city: address.city(),
        state: address.state(),
        zipCode: address.zipCode(),
        latitude: address.latitude(),
        longitude: address.longitude(),
      };
    }),
  );
});

app.get('/products', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const { commerce } = faker;
      return {
        product: commerce.product(),
        price: commerce.price(),
        color: commerce.color(),
      };
    }),
  );
});

app.get('/images', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const { image } = faker;
      return {
        image: image.image(),
        avatar: image.avatar(),
      };
    }),
  );
});

app.get('/random', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const { random } = faker;
      return {
        word: random.word(),
        words: random.words(),
      };
    }),
  );
});

app.get('/users', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const user = faker.name;
      return {
        firstName: user.firstName(),
        lastName: user.lastName(),
        jobTitle: user.jobTitle(),
      };
    }),
  );
});

app.get('/lorem', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const { lorem } = faker;
      return {
        paragraph: lorem.paragraph(),
        sentence: lorem.sentence(),
        paragraphs: lorem.paragraphs(),
      };
    }),
  );
});

app.get('/userCard', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const { helpers } = faker;
      return {
        userCard: helpers.userCard(),
      };
    }),
  );
});

app.get('/createCard', (req, res) => {
  const { count } = req.query;
  if (!count) {
    return res.status(400).send({ errorMsg: 'count query parameter is missing.' });
  }
  res.send(
    _.times(count, () => {
      const { helpers } = faker;
      return {
        createCard: helpers.createCard(),
      };
    }),
  );
});

app.listen(PORT, () => {
  console.log('Server started on port 5000');
});
