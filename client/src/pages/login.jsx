import React, { useState } from "react";
import Logo from "../images/logo.png";

import { MdEmail } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import rightImg from "../images/loginRight.png";
function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState();

  const handleLogin = async (e) =>{
    e.preventDefault();
    await fetch('http://localhost:3000/login',{
      mode:'cors',
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then((res)=>res.json()).then((res)=>{
      // console.log(res.token)
      if(res.success == true){
        localStorage.setItem("token",res.token);
        localStorage.setItem("userId",res.userId);
        localStorage.setItem("idLoggedIn",true);
        navigate('/');
      }else{
        setError(res.message);
      }
    })
  }
  return (
    <>
      <div className="flex overflow-hidden items-center justify-center flex-col h-screen bg-[#F0F0F0]">
        <div className="flex w-full items-center">
          <div className="left w-[30%] flex flex-col ml-[100px]">
            <img className="w-[200px] mt-2" src={Logo} alt="" />
            <form action="" className="pl-3 mt-5" onSubmit={handleLogin}>
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
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
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
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    required
                  />
                  <i className="cursor-pointer I text-[25px]">
                    <IoIosEye />
                  </i>
                </div>
              </div>
              <p className="mt-5 text-red-500">{error}</p>
              <p className="mt-5">
                Don't have an account ?
                <Link to="/signup" className="text-blue-500">
                  signup
                </Link>{" "}
              </p>
              <button className="p-[10px] transition-all hover:bg-green-600  bg-green-500 text-white rounded w-full border-0 mt-3 mb-3">
                Login
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

export default Login;
