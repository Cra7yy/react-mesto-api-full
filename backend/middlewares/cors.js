// Значение для заголовка Access-Control-Allow-Methods
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://mesto.cra7y.nomoredomains.xyz/',
  'https://mesto.cra7y.nomoredomains.xyz/',
  'http://mesto.cra7y.nomoredomains.xyz',
  'https://mesto.cra7y.nomoredomains.xyz',
  'https://api.mesto.cra7y.nomoredomains.xyz',
  'http://api.mesto.cra7y.nomoredomains.xyz',
  'https://api.mesto.cra7y.nomoredomains.xyz/',
  'http://api.mesto.cra7y.nomoredomains.xyz/',
  'http://localhost:3000',
  'http://localhost:3001',

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});
