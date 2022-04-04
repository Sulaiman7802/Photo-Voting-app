import { Image } from "cloudinary-react";
import React, { useState, useEffect } from "react";

export const Hero = () => {
  const [imageIds, setImageIds] = useState(); //This tracks the state of the images from cloudinary
  //This function loads the images onto the page.
  const loadImages = async () => {
    //This fetches the images from the express server and loads it onto the page.
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (error) {
      console.log(error);
    }
  };
  //This will load the images once something in the dependency array changes and this will only happen once.
  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="container grid place-items-center py-10">
      <h1 className="text-3xl pb-7">Images</h1>
      <div className="grid grid-cols-3 gap-10">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              cloudName="sulaimanbotha"
              publicId={imageId}
              width="350"
              crop="scale"
            />
          ))}
      </div>
    </div>
  );
};

/* What I need to do:
1.Loop through the images that will be voted for
2.Give them a state counting value of 0
3.Write a function that increments the state value by 1 each time the picture is clicked
4.Write a function that keeps track of the state and changes the value of the upvotes everytime there is a change in state

*/
