const { handleRegister, handleLogin } = require('../handlers/authHandler');

const register = handleRegister;
const login = handleLogin;

module.exports = { register, login };