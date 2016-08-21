module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '8080',
  production: process.env.NODE_ENV === 'production'
};
