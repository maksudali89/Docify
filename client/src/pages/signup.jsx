import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../images/logo.png";
import { FaUser } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import rightImg from "../images/signUpRight.png";
function Signup() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const SignupUser = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/signup',{
      mode:'cors',
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({username,name,email,phone,password})
    }).then((res)=>res.json()).then((data)=>{
      if(data.success == false){
        setError(data.message)
      }else{
        navigate('/login');
      }
    })
  };

  return (
    <>
      <div className="flex overflow-hidden items-center justify-center flex-col h-screen bg-[#F0F0F0]">
        <div className="flex w-full items-center">
          <div className="left w-[30%] flex flex-col ml-[100px]">
            <img className="w-[200px] mt-2" src={Logo} alt="" />
            <form action="" className="pl-3 mt-5" onSubmit={SignupUser}>
              <div className="inputCo">
                <p className="text-[14px] text-[#808080]">Username</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <FaUser />
                  </i>
                  <input
                    type="text"
                    name="usernames"
                    id="username"
                    placeholder="Username"
                    onChange={e=>setUserName(e.target.value)}
                    value={username}
                    required
                  />
                </div>
              </div>
              <div className="inputCo">
                <p className="text-[14px] text-[#808080]">Name</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <FaUserCircle />
                  </i>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    placeholder="Name"
                    onChange={e=>setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
              </div>
              <div className="inputCo">
                <p className="text-[14px] text-[#808080]">Email</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdEmail />
                  </i>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    placeholder="Email"
                    onChange={e=>setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
              </div>
              <div className="inputCo">
                <p className="text-[14px] text-[#808080]">Phone</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <FaPhoneAlt />
                  </i>
                  <input
                    type="number"
                    name="Phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={e=>setPhone(e.target.value)}
                    value={phone}
                    required
                  />
                </div>
              </div>
              <div className="inputCo">
                <p className="text-[14px] text-[#808080]">Password</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <RiLockPasswordFill />
                  </i>
                  <input
                    type="password"
                    name="Password"
                    id="Password"
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <i className="cursor-pointer I text-[25px]">
                    <IoIosEye />
                  </i>
                </div>
              </div>
              <p className="mt-5 text-red-500">{error}</p>
              <p className="mt-5">
                Already have an account ?
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>{" "}
              </p>
              <button className="p-[10px] transition-all hover:bg-green-600  bg-green-500 text-white rounded w-full border-0 mt-3 mb-3">
                SignUp
              </button>
            </form>
          </div>
          <div className="right flex justify-end items-end">
            <img
              className="h-full w-[34vw] items-end ml-[400px]"
              src={rightImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
