"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex flex-col h-full">
      <div className="px-10 pt-10 pb-2 text-center w-full ">
        <h1 className=" text-3xl">Choose Your Game</h1>
        <h3 className="my-4 text-red-600">
          This site is not yet optimized for mobile and tablets so please only
          use it on PC, or rotate your mobile device.
        </h3>
      </div>
      <div className="flex h-screen mx-10">
        <Link href="/CallOfWar">
          <div
            className={` mx-4 relative grid justify-items-center transition-transform hover:scale-105 transform-gpu ${
              hovered === 1 && "z-20"
            }`}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(0)}
          >
            <h1 className=" p-5 text-3xl">Call Of War</h1>
            <Image
              className=" w-11/12 h-full rounded object-fit hover:shadow-2xl"
              src="/images/ww2.png"
              width={1000}
              height={1000}
              alt=""
            />
          </div>
        </Link>
        <Link href="/ConflictOfNations">
          <div
            className={` mx-4 relative grid justify-items-center transition-transform hover:scale-105 transform-gpu ${
              hovered === 2 && "z-20"
            }`}
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(0)}
          >
            <h1 className=" p-5 text-3xl">Conflict Of Nations</h1>
            <Image
              className=" w-11/12 h-full rounded object-fit hover:shadow-2xl"
              src="/images/ww3.png"
              width={1000}
              height={1000}
              alt=""
            />
          </div>
        </Link>
      </div>
      <div className="fixed bottom-4 right-4">
        <Link href="https://discord.gg/a2EHSsfP">
          <Image
            src="/images/discord.png"
            width={100}
            height={100}
            alt="Discord"
            className="w-12 h-12 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default Page;
