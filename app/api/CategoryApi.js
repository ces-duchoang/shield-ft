import APICaller from "./APICaller";

const prefix = "categories";

export default {
  list() {
    return APICaller(prefix, "GET");
  },
  get(id) {
    return APICaller(`${prefix}/${id}`, "GET");
  },
  create(data) {
    return APICaller(prefix, "POST", data);
  },
  update(data) {
    return APICaller(`${prefix}/${id}`, "PUT", data);
  },
  delete(id) {
    return APICaller(`${prefix}/${id}`, "DELETE");
  }
};