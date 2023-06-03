import React from "react";
import { getTrack } from "@/utils/spotify-api";

async function page() {
  const tracks = await getTrack();
  return <pre>{JSON.stringify(tracks, undefined, 2)}</pre>;
}

export default page;
