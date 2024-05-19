import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'xxxxxxxxxxxxx', 
  api_key: 'xxxxxxxxxxxxxxxx', 
  api_secret: 'xxxxxxxxxxxxxx' 
});

export default cloudinary;
