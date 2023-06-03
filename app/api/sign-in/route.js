import { redirect } from "next/navigation";

export async function GET() {
  const spotify_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = "http://localhost:3000/api/callback";

  const uri = `https://accounts.spotify.com/authorize?client_id=${spotify_id}&response_type=code&redirect_uri=${redirect_uri}&scope=playlist-modify-private%2Cuser-read-private%2Cuser-read-email%2Cuser-top-read`;

  return redirect(uri);
}
