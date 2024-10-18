import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import JoditEditor from "jodit-react";
function CreateDoc() {
  const { docId } = useParams();
  // console.log("id", docId);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState();
  const documentUpdated = async () => {
    await fetch("http://localhost:3000/docs/dcoUpdate", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docId,
        content,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          setError(data.message);
        } else {
          setError("");
        }
      });
  };
  const GettingDocs = async () => {
    try {
      await fetch(`http://localhost:3000/docs/fetchDocs?docId=${docId}&userId=${localStorage.getItem("userId")}`, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.success = false){
            setError(data.message)
          }else{
            setContent(data.doc.content);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GettingDocs();
  }, []);

  return (
    <>
      <NavBar />
      <div className="px-[100px] mt-3">
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1} // tabIndex of textarea
          onChange={(e) => {
            setContent(e), documentUpdated();
          }}
        />
      </div>
    </>
  );
}

export default CreateDoc;
