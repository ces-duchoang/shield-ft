import caller from './APICaller';

const prefix = 'publishers';

export default {
  list() {
    return caller(prefix, 'GET');
  },
  get(id) {
    return caller(`${prefix}/${id}`, 'GET');
  },
  create(data) {
    return caller(prefix, 'POST', data);
  },
  update(data) {
    return caller(`${prefix}/${data._id}`, 'PUT', data);
  },
  delete(id) {
    return caller(`${prefix}/${id}`, 'DELETE');
  },
};
