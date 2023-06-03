"use server";

import { getSpotifyApi, getUserRecommend } from "@/utils/spotify-api";
import querystring from "querystring";
import axios from "axios";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";

export async function newRecommendation(
  genre,
  limit,
  energy,
  dance,
  seed_artists
) {
  const uri =
    "https://api.spotify.com/v1/recommendations?" +
    querystring.stringify({
      seed_genres: genre,
      limit: limit,
      target_energy: energy,
      target_danceability: dance,
      seed_artists,
    });

  const rs = await getSpotifyApi(uri);

  revalidatePath("/dashboard");

  return rs;
}

export async function search(q) {
  const data = await getSpotifyApi(
    `https://api.spotify.com/v1/search?q=${q}&type=album%2Cplaylist%2Ctrack%2Cartist%2Cshow&limit=2`
  );

  return data.tracks.items;
}

export async function createPlaylist(title, limit, genre) {
  if (!title) return null;
  const { id } = await getSpotifyApi("https://api.spotify.com/v1/me");
  const cookieStore = cookies();
  const s_auth = cookieStore.get("spotify-access-token")?.value;
  if (!s_auth) return console.log("error");

  const headers = {
    Authorization: `Bearer ${s_auth}`,
    "Content-Type": "application/json",
  };

  const data = {
    name: title,
    description: "This playlist was created by Johannes Eriksson",
    public: false,
  };

  try {
    const playlist = await axios.post(
      `https://api.spotify.com/v1/users/${id}/playlists`,
      data,
      { headers }
    );

    const playlist_id = playlist.data.id;
    const userTracks = await getUserRecommend();
    const { tracks } = await newRecommendation(
      genre,
      limit,
      0.9,
      0.9,
      userTracks
    );

    const uris = tracks.map((track) => track.uri);

    const data2 = {
      uris: uris,
    };

    const songsInserted = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      data2,
      { headers }
    );

    return true;
  } catch (err) {
    return false;
  }
}
