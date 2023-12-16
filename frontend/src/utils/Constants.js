const optionApi = {
  baseUrl: 'http://localhost:3000',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
};
export {optionApi};