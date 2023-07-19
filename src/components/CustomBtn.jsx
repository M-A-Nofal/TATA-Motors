"use client";

import Image from "next/image";
import React from "react";

const CustomBtn = ({
  title,
  containerStyles,
  handleClick,
  textStyles,
  rightIcon,
}) => {
  return (
    <div>
      <button
        disabled={false}
        type={"button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
      >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className=" relative w-6 h-6">
            <Image
              src={rightIcon}
              alt="icon"
              fill
              className=" object-contain"
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default CustomBtn;
