const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, require: true },
    vinte: { type: Number, require: true },
    perse: { type: Number, require: true },
    giocate: { type: Number, require: true },
    isonline: { type: Boolean, require: true },
    isingame: { type: Boolean, require: true },
    admin: { type: Boolean, require: true }
}, { collection: 'user' });

const User = mongoose.model('User', userSchema);
module.exports = User;