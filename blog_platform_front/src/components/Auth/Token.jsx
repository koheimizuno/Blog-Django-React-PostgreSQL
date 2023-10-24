const token = localStorage.getItem('token');
const userDataJSON = localStorage.getItem('userData')
const userData = userDataJSON ? JSON.parse(userDataJSON) : null

export {token, userData};