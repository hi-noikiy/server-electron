const mongoose = require('mongoose');
require('./userModel');
require('./visitorModel');

exports.User = mongoose.model('User');
exports.Visitor = mongoose.model('Visitor');