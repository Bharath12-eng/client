/* import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';

function UserApi(token) {
  const [isLogged,setIsLogged] = useState(false);
  
  useState(() => {
    if (token){
      const getUser =async () => {
        try{
          const res = await axios.get(`/get/auth/userinfo`, {
            headers: { Authorization: token},
          });
          setIsLogged(true);

        }catch (err) {
          toast.error(err.response.data.msg);
        }
      }
      getUser();
    }
  }, [token]);
  return {
    isLogged: [isLogged, setIsLogged],
  }
    
}

export default UserApi */

import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function UserApi(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);


  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          //reading user info
          const res = await axios.get(`/api/auth/userinfo`, {     
            headers: { Authorization: token },
          });
          //set login state
          setIsLogged(true);
          //validate role
          res.data.role === "admin" ? setIsAdmin(true) : setIsAdmin(false)

        // console.log("user details = ", res.data);
          setLoggedUser(res.data)
    } catch (err) {
          toast.error(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    loggedUser: [loggedUser, setLoggedUser] 
  }
}

export default UserApi;
