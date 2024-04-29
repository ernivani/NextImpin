"use client";
import React from "react";
import "grapesjs/dist/css/grapes.min.css";
import gjspresetwebpage from "grapesjs-preset-webpage";
import gjsblockbasic from "grapesjs-blocks-basic";
import { GrapesjsReact } from "grapesjs-react";

export const Primary = () => {
  const projectId = "662f115ec682cb273174ee7b";
  const projectEndpoint = `http://localhost:3000/api/grapesjs`;

  const handleClick = async (e) => {
    const submitData = {
      email: "tlindeker0@gmail.com",
      projectName: "Test Project1",
    };

    try {
      const res = await fetch("http://localhost:3000/api/grapesjs", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        alert("Yeai!");
      } else {
        alert("Oops! Something is wrong.");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {/* <button onClick={handleClick}>BTn</button> */}
      <GrapesjsReact
        storageManager={{
          type: "remote",
          stepsBeforeSave: 3,
          options: {
            remote: {
              urlLoad: projectEndpoint + "/" + projectId,
              urlStore: projectEndpoint,
              fetchOptions: (opts) =>
                opts.method === "POST" ? { method: "PATCH" } : {},
              onStore: (data) => ({ id: projectId, data }),
              onLoad: (res) => res.data,
            },
          },
        }}
        id="grapesjs-react"
        plugins={[gjspresetwebpage, gjsblockbasic]}
      />
    </>
  );
};
export default Primary;
