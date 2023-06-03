import PlaylistBuilder from "@/components/Playlistbuilder";
import React from "react";

function page() {
  return (
    <div className="w-screen h-[80vh] flex md:flex-row flex-col-reverse justify-evenly">
      <div className="w-full grid place-items-center">
        <PlaylistBuilder />
      </div>
      <div className="w-full grid place-items-center bg-blue-600">
        <div className="w-[30rem] text-center md:text-left">
        <h1 className="text-2xl text-gray-100 font-semibold ">
          Create the perfect playlist for the upcomming summer with Mbot.AI
        </h1>
        <p className="text-gray-300 text-base">With a few simple clicks you can have AI create the perfect playlist for the summer.</p>
        <div className="flex gap-5 pt-3">
          <button className="px-8 py-2 rounded text-xs shadow-lg bg-indigo-800 text-white">Sample</button>
          <button className="px-8 py-2 rounded text-xs shadow-lg bg-indigo-800 text-white">Sample</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default page;
