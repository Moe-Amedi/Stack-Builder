"use client";
import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [hovered, setHovered] = useState(0);
  return (
    <div
      className="flex flex-col h-full bg-cover"
      style={{
        backgroundImage: 'url("/images/modern-war.jpg")',
      }}
    >
      <div className="px-10 pt-10 pb-2 text-center w-full ">
        <h1 className=" text-3xl">Choose Your Doctrine</h1>
      </div>
      <div className="flex h-screen mx-10 mb-10 justify-center">
        <Link href="/ConflictOfNations/western">
          <div
            className={` mx-4 relative grid justify-items-center transition-transform hover:scale-105 transform-gpu ${
              hovered === 1 && "z-20"
            }`}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(0)}
          >
            <h1 className=" p-5 text-3xl">Western</h1>
            <img
              className=" w-full h-full rounded object-fit hover:shadow-2xl"
              src="/images/con-west.png"
            />
          </div>
        </Link>
        <Link href="/ConflictOfNations/european">
          <div
            className={` mx-4 relative grid justify-items-center transition-transform hover:scale-105 transform-gpu ${
              hovered === 2 && "z-20"
            }`}
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(0)}
          >
            <h1 className=" p-5 text-3xl">European</h1>
            <img
              className=" w-full h-full rounded object-fit hover:shadow-2xl"
              src="/images/con-eu.png"
            />
          </div>
        </Link>
        <Link href="/ConflictOfNations/eastern">
          <div
            className={` mx-4 relative grid justify-items-center transition-transform hover:scale-105 transform-gpu ${
              hovered === 2 && "z-20"
            }`}
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(0)}
          >
            <h1 className=" p-5 text-3xl">Eastern</h1>
            <img
              className=" w-full h-full rounded object-fit hover:shadow-2xl"
              src="/images/con-east.png"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
