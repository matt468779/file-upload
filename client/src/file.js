import React from "react";
import axios from "axios";
import UploadFile from "./uploadFile";
const baseURL = "http://127.0.0.1:8003"
const File = () => {

  const [files, setFiles] = React.useState(null)

  React.useEffect(() => {
    axios.get(`${baseURL}`).then((res) => {
      setFiles(res.data)
      console.log(res.data)
    })
  }, [])

  const deleteFile = (id) => {
    axios.delete(`${baseURL}/delete/${id}`)
    .then(() => {
      console.log("deleted successfully")
    });
  }

  const renderRow = () => {
    const rows = files.map((file) => {
      return (
        <tr key={file.id}>
          <td><a href={`${baseURL}/${file.location}`}>{file.filename}</a></td>
          <td>{file.size}</td>
          <td>{file.date}</td>
          <button onClick={() => deleteFile(file.id)}>Delete</button>
        </tr>
      )
    })
    
    return (
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th>Upload Date</th>
            
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    )
  }
  if (!files) return null
  return <>
    <h1>Files</h1>
    <UploadFile/>
    {renderRow()}
  </>;
};

export default File;