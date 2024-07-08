"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [hovered, setHovered] = useState(0);
  return (
    <div
      className="flex flex-col h-full bg-fixed bg-origin-border bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: 'url("/images/ww3-bg.jpg")',
      }}
    >
      <div className="navbar bg-slate-700 fixed top-0 z-30 shadow-xl">
        <div className="flex-1">
          <a className="btn btn-ghost bg-slate-800" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="px-10 pt-10 pb-2 text-center w-full mt-12  ">
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
            <Image
              className=" w-full h-full rounded object-fit hover:shadow-2xl"
              src="/images/con-west.png"
              alt=""
              width={1}
              height={1}
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
            <Image
              className=" w-full h-full rounded object-fit hover:shadow-2xl"
              src="/images/con-eu.png"
              alt=""
              width={1}
              height={1}
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
            <Image
              className=" w-full h-full rounded object-fit hover:shadow-2xl"
              src="/images/con-east.png"
              alt=""
              width={1}
              height={1}
            />
          </div>
        </Link>
      </div>
      <div className="fixed bottom-4 right-4">
        <Link href="https://discord.gg/a2EHSsfP">
          <Image
            src="/images/discord.png"
            alt="Discord"
            className="w-12 h-12 cursor-pointer"
            width={1}
            height={1}
          />
        </Link>
      </div>
    </div>
  );
};

export default Page;
