import Link from "next/link";
import React from "react";
import { getSpotifyApi } from "@/utils/spotify-api";

async function Nav() {
  const style =
    "px-2 py-1 text-sm hover:bg-gray-400 rounded hover:shadow-md bg-white duration-100 cursor-pointer";
  const profileData = await getSpotifyApi("https://api.spotify.com/v1/me");
  return (
    <div className="flex justify-between px-12 py-5 items-center">
      <h1 className="w-64">
        <Link href={"/dashboard"} className={style}>
          Mbot.AI
        </Link>
      </h1>
      <div className="flex gap-5">
        <Link className={style} href={"/dashboard/playlistbuilder"}>
          Playlist generator
        </Link>
        <Link className={style} href={"/dashboard/tracks"}>
          Tracks
        </Link>
        <h1 className={style}>{profileData.email}</h1>
      </div>
    </div>
  );
}

export default Nav;
