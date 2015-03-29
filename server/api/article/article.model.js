'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    name: String,
    photoLink: String,
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
    tests: Schema.Types.Mixed,
    test1: String,
    test1Result: String,
    test1Rank: String,
    test2: String,
    test2Result: String,
    test2Rank: String,
    test3: String,
    test3Result: String,
    test3Rank: String,
    test4: String,
    test4Result: String,
    test4Rank: String,
    test5: String,
    test5Result: String,
    test5Rank: String
});

module.exports = mongoose.model('Article', ArticleSchema);