const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const fs = require('fs');
const path = require('path')

if (process.env.NODE_ENV !== 'production') require('../../secrets')

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: process.env.VIS_REC_API
});

module.exports = visualRecognition
