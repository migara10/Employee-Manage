import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../auth/axiosInstance.js';
import NavBar from '../../Nav/NavBar';

function HomeComponent() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/getUsers");
      console.log(response.data);
      setUserData(response.data); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };



  return (<div>
        
      <h1>HomeComponent</h1>
      {userData && (
        <div>
          <h2>User Data</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default HomeComponent;
