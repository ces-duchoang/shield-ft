import APICaller from "./APICaller";

const prefix = "authors";

export default {
  list(page = 1) {
    return APICaller(prefix, "GET", { params: { page } });
  },
  get(id) {
    return APICaller(`${prefix}/${id}`, "GET");
  },
  create(data) {
    return APICaller(prefix, "POST", data);
  },
  update(data) {
    return APICaller(`${prefix}/${data._id}`, "PUT", data);
  },
  delete(id) {
    return APICaller(`${prefix}/${id}`, "DELETE");
  }
};
