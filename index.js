import express from 'express'
import request from 'request'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// eslint-disable-next-line import/extensions
import { generateUploadURL } from './s3.js'
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
const PORT = process.env.PORT || 5000
app.use(express.static('public'))

app.get('/s3Url', async (req, res) => {
  const url = await generateUploadURL()
  res.send({ url })
})
app.post('/notify', (req, res) => {
  const urlLineNotification = 'https://notify-api.line.me/api/notify'
  const { message, image } = req.body
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
      message,
      imageThumbnail: image,
      imageFullsize: image,
    },
  }, (err, httpResponse, body) => {
    if (err) {
      console.log(err)
    //   res.send(err);
    } else {
    //   console.log(body);
      res.send(body)
    }
  })
})

app.listen(PORT, () => {
  console.log('Server started on port 5000')
})
