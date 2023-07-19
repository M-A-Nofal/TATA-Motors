"use client";

import React from "react";
import CustomBtn from "./CustomBtn";
import Image from "next/image";

const Hero = () => {
  const handleScroll = () => {
    console.log("btn");
  };

  return (
    <div className="hero">
      <div className=" flex-1 pt-36 padding-x">
        <h1 className="hero__title">Find Best Car & Limousine</h1>
        <p className="hero__subtitle dark:text-gray-300">
          From as low as $10 per day with limited time offer discounts
        </p>
        <CustomBtn
          title="Explore Cars"
          containerStyles=" bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/heroImg.png"
            alt="hero-img"
            fill
            className=" object-contain"
          />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
