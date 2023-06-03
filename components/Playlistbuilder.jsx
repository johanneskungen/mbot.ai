"use client";

import { createPlaylist } from "@/app/actions";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { genres } from "@/utils/selections";

const numbers = [3, 4, 5, 6, 7, 8];

function Playlistbuilder() {
  async function run(f) {
    const limit = f.get("limit");
    const title = f.get("title");
    const genre = f.get("genre");
    const dance = f.get("dance");
    console.log(dance);
    const energy = f.get("energy");
    await createPlaylist(title, limit, genre, energy, dance);
    toast.success("Playlist " + title + " was successfully created");
  }

  return (
    <div>
      <Toaster />
      <div>
        <form action={run} className="flex flex-col gap-3 w-[30rem]">
          <input
            className="px-2 py-2 border shadow-lg rounded"
            placeholder="title"
            name="title"
            id="title"
          />
          <select className="border p-2" name="limit">
            {numbers.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <select name="genre">
            {genres.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-semibold">
              Danceability
            </label>
            <input
              className="cursor-pointer"
              type="range"
              min={0}
              name="dance"
              max={1}
              step={0.1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-semibold">
              Energy
            </label>
            <input
              className="cursor-pointer"
              type="range"
              name="energy"
              min={0}
              max={1}
              step={0.1}
            />
          </div>
          <button className="sub" type="submit">
            generate playlist
          </button>
        </form>
      </div>
    </div>
  );
}

export default Playlistbuilder;
