import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import { GoPlus } from "react-icons/go";
import Docs from "../components/Docs";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function Home() {
  const [isCreateModel, setIsCreateModel] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  // console.log(title)
  const [data, setData] = useState(null);
  const CreateNewDocument = async () => {
    if (title === "") {
      setError("Please Enter Title ");
    } else {
      await fetch("http://localhost:3000/docs/document", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, userId: localStorage.getItem("userId") }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success == true) {
            setIsCreateModel(false);
            navigate("/");
          } else {
            setError(data.message);
          }
        });
    }
  };

  const getAllDocs = () => {
    fetch(
      `http://localhost:3000/docs/AllDocs?userId=${localStorage.getItem(
        "userId"
      )}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.docs);
        setData(res.docs);
      });
  };
  console.log(data);

  useEffect(() => {
    getAllDocs();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-between px-[100px] ">
        <h3 className="mt-7 mb-3 text-3xl">All documents</h3>
        <button
          className="btnBlue hover:bg-[#1E40AF]"
          onClick={() => {
            setIsCreateModel(true);
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <i>
            <GoPlus />
          </i>
          Create New Document
        </button>
      </div>
      <div className="allDocs px-[100px] mt-4">
        {data
          ? data.map((el) => {
              return (
                <>
                  <Docs docs={el} />
                </>
              );
            })
          : "No  Document"}
      </div>
      {isCreateModel ? (
        <>
          <div className="createDocsModeCon fixed top-0 bottom-0 left-0  right-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center ">
            <div className="createDocModel p-[15px] bg-[#fff] rounded-lg w-[35vw] h-[20vw]">
              <h3 className="text-[30px] flex items-center justify-center ">
                Create New Document
              </h3>
              <div className="inputCo mt-5">
                <p className="text-[20px] text-[#808080]">Enter A Title </p>
                <div className="inputBox w-[100%] mt-5">
                  <i>
                    <IoSearch />
                  </i>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    ref={inputRef}
                    placeholder="Enter A Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-between w-full">
                <button
                  onClick={() => CreateNewDocument()}
                  className="btnBlue mb-0 w-[49%]"
                >
                  Create New title
                </button>
                <button
                  className="p-[10px] bg-[#D1D5DB] w-[49%]"
                  onClick={() => setIsCreateModel(false)}
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

export default Home;
