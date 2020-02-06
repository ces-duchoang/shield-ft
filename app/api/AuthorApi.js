import caller from './APICaller';

const prefix = 'authors';

export default {
  list(page = 1) {
    return caller(prefix, 'GET', {params: {page}});
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
