import { notification } from 'antd';

export default err => {
  if (err.name === 'Error') {
    err.response
      ? notification.error({
          message: 'Error ' + err.response.status,
          description: err.response.data.message
        })
      : notification.error({
          message: 'Error',
          description: 'Sorry something went wrong'
        });
  } else console.log(err);
};
