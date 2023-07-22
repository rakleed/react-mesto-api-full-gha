require('dotenv').config();

module.exports.MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb';
module.exports.PORT = 3003;

module.exports.SECRET_PASSWORD_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secret-key';

module.exports.REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
module.exports.REGEX_ID = /[a-z0-9]{24}/;
