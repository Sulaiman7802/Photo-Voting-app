import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Upload = () => {
  const [previewSource, setAsPreviewSource] = useState(""); //This keeps track of the state of the image that is being previewed.
  const [fileInputState, setFileInputState] = useState(); //This keeps track of the state for whether or not a file has been selected
  const [selectedFile, setSelectedFile] = useState(""); //This keeps track of the state for which file is selected

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; //sets files as the file target
    previewFile(file); //This is a function that calls the file variable
  };

  const previewFile = (file) => {
    const reader = new FileReader(); //This is a built in js api
    reader.readAsDataURL(file); // Turns file into a URL
    reader.onloadend = () => {
      setAsPreviewSource(reader.result); //This will display the selected file if it is set.
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
    return <Link to="/" />;
  };
  //This creates a string representation of the file chosen
  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    //This submits the string representation of the image to the servers
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //The form will call the handleSubmitfile function once the button is clicked
  return (
    <div className="grid place-content-center mt-44">
      <h1 className="text-3xl">Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input py-5"
        ></input>
        <div>
          <button
            type="submit"
            className="h-10 w-24 bg-cyan-500 rounded focus:border focus:bg-cyan-700 text-white"
          >
            Submit
          </button>
        </div>
      </form>

      {previewSource && (
        <img src={previewSource} alt="" className="w-1/4" /> //If there is a previewSource then the image will be that.
      )}
    </div>
  );
  //if there is a preview source then display this image
};
