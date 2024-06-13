import React, { useRef } from "react";

const Test = () => {
  const fileInputRef = useRef(null);
  const handleBtnClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
        aria-label="photo"
      />
      <img
      onClick={handleBtnClick}
        src="https://image-component.nextjs.gallery/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmountains.a2eb1d50.jpg&w=750&q=75"
        alt=""
      />
      {/* <button onClick={handleBtnClick}>photo input</button> */}
    </div>
  );
};

export default Test;
