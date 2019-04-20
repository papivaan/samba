'use strict';
module.exports = function(app) {
  var parkingAreas = require('../controllers/apiController');

  app.route('/sendSms')
    .post(parkingAreas.sendSms)
};