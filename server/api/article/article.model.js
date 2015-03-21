'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    name: String,
    EAN13: String,
    department: String,
    collectionType: String,
    brand: String,
    brandLink: String,
    denomination: String,
    description: String,
    category: String,
    seller: String,
    color: String,
    lot: String,
    startDate: String,
    endDate: String,
    price: String,
    materials: Schema.Types.Mixed,
    presence: Schema.Types.Mixed,
    nepcodeRef: String,
    tests: Schema.Types.Mixed
});

module.exports = mongoose.model('Article', ArticleSchema);