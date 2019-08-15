import APICaller from "./APICaller";

const prefix = "teams";

export default {
  list() {
    return APICaller(prefix);
  },
  get(id) {
    return APICaller(`${prefix}/${id}`);
  },
  create(team) {
    return APICaller(prefix, "POST", team);
  },
  update(team) {
    return APICaller(`${prefix}/${team._id}`, "PUT", team);
  },
  delete(id) {
    return APICaller(`${prefix}/${id}`, "DELETE");
  }
};
