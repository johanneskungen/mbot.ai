import axios from "axios";
import { redirect } from "next/navigation";
import querystring from "querystring";
import { cookies } from "next/headers";

export async function GET(req) {
  const code = req.url.split("?")[1].split("=")[1] || null;

  try {
    const { data } = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/api/callback",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${new Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    });

    const cookie = cookies();
    cookie.set("spotify-access-token", data.access_token);

    redirect("/");
  } catch (err) {
    redirect("/");
  }
}
