'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListSchema = new Schema({
    name: String,
    list: Schema.Types.Mixed
});

module.exports = mongoose.model('List', ListSchema);