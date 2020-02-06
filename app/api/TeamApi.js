import caller from './APICaller';

const prefix = 'teams';

export default {
  list() {
    return caller(prefix);
  },
  get(id) {
    return caller(`${prefix}/${id}`);
  },
  create(team) {
    return caller(prefix, 'POST', team);
  },
  update(team) {
    return caller(`${prefix}/${team._id}`, 'PUT', team);
  },
  delete(id) {
    return caller(`${prefix}/${id}`, 'DELETE');
  },
};
