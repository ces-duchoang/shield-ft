import caller from './APICaller';

const prefix = 'auth';

export default {
  auth(email, password, remember) {
    return caller(prefix, 'POST', { email, password, remember });
  },
  get() {
    return caller(prefix, 'GET');
  }
};
