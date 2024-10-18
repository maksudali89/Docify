import React, { useState } from "react";
import DocsIcon from "../images/docsIcon.png";
import { MdDelete } from "react-icons/md";
import DeletePng from "../images/delete.png";
import { useNavigate } from "react-router-dom";
const  Docs = ({docs}) => {
  const [isDeleteModel, setIsDeletedModel] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const deleteDocs = async (id)=> {
      await fetch(`http://localhost:3000/docs/deleteDocs?docId=${id}&userId=${localStorage.getItem("userId")}`,{
        method:'DELETE',
        headers:{
          "Content-Type" :"application/json"
        }
      }).then(res => res.json()).then(res=>{
        if(res.success == false){
          setError(res.message)
        }else{
          setError("");
        }
      })
  }
  return (
    <>
      <div className="docs flex items-center cursor-pointer justify-between mt-5 p-[10px] bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]">
        <div onClick={()=>navigate(`/createDocs/${docs._id}`)} className="left flex items-center gap-2">
          <img src={DocsIcon} alt="" />
          <div>
            <h3 className="text-[23px] ml-2">
              { docs && docs.title}
            </h3>
            <p className="ml-3 text-[15px] text-[#808080]">
              Created In : {docs && new Date(docs.date).toDateString()}  | Last Updated : { docs && new Date(docs.lastUpdate).toDateString()}
            </p>
          </div>
        </div>
        <div className="docsRight">
          <i onClick={()=>{setIsDeletedModel(true)}} className="text-red-500 text-[40px] cursor-pointer">
            {" "}
            <MdDelete />{" "}
          </i>
        </div>
      </div>

      {isDeleteModel ? (
        <>
          <div className="deleteDoc fixed top-0 bottom-0 left-0  right-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center ">
            <div className="deleteModel flex  flex-col justify-center  p-[15px] bg-[#fff] rounded-lg w-[35vw] h-[19vw] ">
              <h3 className="text-[25px]">Delete Document</h3>
              <div className="flex items-center gap-3 mt-4">
                <img src={DeletePng} alt="" />
                <div>
                  <h3 className="text-[15px]">
                    Do You Want Delete This Document
                  </h3>
                  <p className="text-[12px] text-[#808080]">Delete / Cancel</p>
                </div>
              </div>
              <div className="flex mt-4 px-[40px] items-center gap-2 justify-between w-full">
                <button onClick={()=>deleteDocs(docs._id)} className="p-[10px] bg-red-500 hover:bg-red-600 rounded-lg w-[50%]">
                  Delete
                </button>
                <button
                  className="p-[10px] bg-[#D1D5DB] rounded-lg w-[50%]"
                  onClick={() => setIsDeletedModel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Docs;
