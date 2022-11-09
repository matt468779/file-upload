import React from "react";
import axios from "axios";
const baseURL = "http://127.0.0.1:8003"

const UploadFile = () => {

 const handleFormSubmit = async (e) => {
  // e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const files = e.currentTarget.files;
  for (let i = 0; i < files.length; i++) {
    formData.append('files[]', files[i]);
  }
  console.log(files)

  const res = await axios.post(`${baseURL}/upload-files`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(res);
};

 return <>
  <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
    <input type='file' name='files' multiple />
    <button type='submit'>Upload</button>
</form>
 </>
};

export default UploadFile;