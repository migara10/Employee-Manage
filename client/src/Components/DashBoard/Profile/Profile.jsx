import React, { useState } from "react";
import { useUser } from "./../../../UserContext.jsx";
import  axiosInstance  from "./../../../auth/axiosInstance.js";
import "./profile.scss";

function Profile() {
  const { user } = useUser();
  const [file, setFile] = useState();
  const [imgUrl, setImgUrl] = useState();

  console.log(user, 'user details')

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const onUpload = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      try {
        const img = await convertBase64(selectedFile);
        setImgUrl(img);
      } catch (error) {
        console.error(error);
      }
    } else {
      setImgUrl(null);
    }
  };

  return (
    <div className="profile">
      {user && (
        <div className="profile-card">
          <div className="profile-img">
            <label htmlFor="add-image" className="">
              {!imgUrl && (
                
                <img
                  className="profile-image"
                  src={`${axiosInstance.defaults.baseURL}${user.img}`}
                  alt="Book Cover"
                />
              )}
              {imgUrl && (
                <img className="profile-image" src={imgUrl} alt="" />
              )}

              <input
                type="file"
                id="add-image"
                className="invisible hidden"
                onChange={onUpload}
              />
            </label>
          </div>
          <form>
            {/* firstName */}
            <div>
              <label htmlFor="email">
                <p>First Name:</p>
              </label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                autoComplete="off"
                placeholder="Enter First Name"
                className="form-control"
              />
            </div>
            {/* userName */}
            <div>
              <label htmlFor="email">
                <p>User Name:</p>
              </label>
              <input
                type="text"
                name="firstName"
                value={user.userName}
                autoComplete="off"
                placeholder="Enter First Name"
                className="form-control"
              />
            </div>
            {/* select role */}
            <div>
              <label htmlFor="role">
                <p>Select Role:</p>
              </label>
              <select name="role" className="form-control" value={user.role}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
