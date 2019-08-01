import { notification } from "antd";

export default err =>
  notification.error({
    message: "Error " + err.response.status,
    description: err.response.data.message
  });
