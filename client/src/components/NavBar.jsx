import React, { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import { IoSearch } from "react-icons/io5";
import Avatar from 'react-avatar';
import { useNavigate } from "react-router-dom";
function NavBar() {
  const [Data, setData] = useState(null);
  const navigate =  useNavigate();
  const getUser = async () =>{
      await fetch(`http://localhost:3000/getUser?userId=${localStorage.getItem("userId")}`,{
        method:'GET',
        headers:{
          "Content-Type" : "application/json"
        }
      }).then(res => res.json()).then(data =>{
        setData(data.user)
      });
  };
  useEffect(()=>{
    getUser();
  },[]);

  const logOut = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("idLoggedIn")

    setTimeout(() => {
      navigate("/login")
    }, 100);
  }
  return (
    <>
      <div className="navbar flex items-center px-[100px] justify-between bg-[#F4F4F4]">
        <img src={Logo} alt="" />
        <div className="right flex items-center gap-4">
          <div className="inputBox w-[35vw]">
            <i><IoSearch /></i>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Here ...."
            />
          </div>
          <button onClick={()=>logOut()} className="p-[10px] bg-red-500 min-w-[120px] text-white transition-all hover:bg-red-700 rounded-lg ">LogOut</button>
          <Avatar name={Data ? Data.name : ""} className="cursor-pointer" size="40" round="50%" />
        </div>
      </div>
    </>
  );
}

export default NavBar;
