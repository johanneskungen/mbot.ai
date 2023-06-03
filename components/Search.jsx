"use client";

import { search } from "@/app/actions";
import Image from "next/image";
import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import music from "@/assets/music.jpg";

function Search() {
  const [d, setD] = useState([]);
  async function run(form) {
    const query = form.get("query");
    if (!query || query === "") return null;

    const data = await search(query);

    setD(data);

    return data;
  }

  return (
    <>
      <div className="h-[50vh] w-screen absolute top-0 left-0 -z-20">
        <Image src={music} fill alt="background" className="object-cover " />
      </div>
      <div className="h-[50vh] w-screen absolute top-0 left-0 -z-10 bg-black/60"/>
      <div className="h-[50vh] w-screen grid place-items-center">
        <form action={run}>
          <input
            placeholder="search song"
            className="border px-3 focus:outline-none py-2 text-lg shadow-lg rounded-l"
            type="text"
            name="query"
            id="query"
          />
          <button
            className="px-3 py-2 rounded-r shadow-lg bg-blue-600 text-white text-lg"
            type="submit"
          >
            search
          </button>
        </form>
      </div>

      <main className="grid place-items-center">
        {d[0] && (
          <h1 className="text-xl text-gray-700 pb-4 w-screen md:w-[60rem]">
            Search results
          </h1>
        )}
        <section className="grid w-screen md:w-[60rem] md:grid-cols-2">
          {d &&
            d.map((song) => {
              return (
                <div
                  className="rounded bg-slate-800 text-white w-96 gap-3 flex flex-col"
                  key={song.id}
                >
                  <div>
                    <div className="h-24 w-full relative">
                      <Image
                        fill
                        alt="album cover"
                        className="object-cover"
                        src={song.album.images[1].url}
                      />
                    </div>
                    <h1 className="px-3 pt-2" key={song.id}>
                      {song.name}
                    </h1>
                    <div className="px-3 ">
                      {song.artists.map((a) => (
                        <p key={a.name} className="text-gray-400 text-sm">
                          {a.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="self-center pb-4 p-2">
                    <ReactAudioPlayer
                      className="h-10"
                      src={song.preview_url}
                      controls
                    />
                  </div>
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
}

export default Search;
