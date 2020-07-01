const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = require('./message');

const inboxSchema = new Schema({
    partnerName: {
        type: String,
        required: true
    },
    partnerId: {
        type: String,
        required: true
    },
    messages: [messageSchema]
})

module.exports = inboxSchema;