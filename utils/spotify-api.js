import axios from "axios";
import { cookies } from "next/headers";
import querystring from "querystring";

export async function getTrack(id) {
  const cookieStore = cookies();
  const s_auth = cookieStore.get("spotify-access-token")?.value;
  if (!s_auth) return console.log("error");
  const { data } = await axios.get(
    "https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P",
    {
      headers: {
        Authorization: `Bearer ${s_auth}`,
      },
    }
  );
  return data;
}

export async function getSpotifyApi(uri) {
  const cookieStore = cookies();
  const s_auth = cookieStore.get("spotify-access-token")?.value;
  if (!s_auth) return console.log("error");

  const response = await axios.get(uri, {
    headers: {
      Authorization: `Bearer ${s_auth}`,
    },
  });

  return response.data;
}

export async function getUserRecommend() {
  const uri2 =
    "https://api.spotify.com/v1/me/top/artists?" +
    querystring.stringify({
      time_range: "long_term",
      limit: 2,
    });

  const { items } = await getSpotifyApi(uri2);

  const ids = items.map((item) => item.id)

  return ids;
}
