const Model = require('./../../models/mysql');
const roomModel = Model.roomModel;
const Sequelize = require('sequelize');

exports.addRoom = async function (data) {
  let room = roomModel.build(data);
  await room.save();
}