const models = require('./../models');
const Visitor = models.Visitor;

exports.save = async (visitors) => {
    const visitor = new Visitor(visitors);
    return visitor.save();
}
exports.findOne = async (where) => {
    return Visitor.findOne(where);
}
exports.addOrUpdate = async (update) => {
    return Visitor.update(update)
}