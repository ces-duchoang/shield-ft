import axios from 'axios';
import {getUserInfo} from './Session';

const uploadPreset = getUserInfo() ? getUserInfo().upload_preset || '' : '';
const uploadEndpoint = `https://api.cloudinary.com/v1_1/shieldmanga/image/upload`;

export default {
  uploadImage: (image) => {
    const formData = new FormData();
    formData.append('upload_preset', uploadPreset);
    formData.append('file', image);
    return axios.post(uploadEndpoint, formData);
  },
};
