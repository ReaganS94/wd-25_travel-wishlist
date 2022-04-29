const express = require('express');

const { getAllCountries, createCountry, getOneCountry, updateCountry, deleteCountry } = require('../controllers/Countries')

const api = express.Router();

api.route('/').get(getAllCountries).post(createCountry)
api.route('/:code').get(getOneCountry).put(updateCountry).delete(deleteCountry)

module.exports = api;