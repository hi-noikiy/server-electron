const mongoose = require('mongoose');

require('./userModel');

exports.User = mongoose.model('User');