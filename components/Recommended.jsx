import React from "react";
import Image from "next/image";
import { newRecommendation } from "@/app/actions";
import { genres } from "@/utils/selections";
import Link from "next/link";

async function Recommended() {
  const id = Math.floor(Math.random() * genres.length);
  const genre = genres[id];
  const recommendations = await newRecommendation(genre, 5, 0.5, 0.5);

  return (
    <section className="p-5 flex flex-col items-center">
      <div>
        <div>
          <h1 className="pb-3 self-start text-gray-700 text-xl">
            From genre {genre}{" "}
            <button className="text-sm bg-blue-600 text-white px-2 py-1 rounded">
              new genre
            </button>
          </h1>
        </div>
        <div className="grid md:grid-cols-4 w-screen md:w-[60rem] place-items-center gap-4">
          {recommendations?.tracks.slice(0, 8).map((r) => (
            <div
              className="bg-slate-800 flex flex-col justify-between shadow-lg rounded w-52 min-h-72 "
              key={r.id}
            >
              <div className="w-full h-44 overflow-hidden relative">
                {r.album.images[2] && (
                  <Image
                    fill
                    alt="preview"
                    className="rounded-t object-cover"
                    src={r.album.images[1].url}
                  />
                )}
              </div>
              <div className="p-4 flex flex-col gap-3">
                <h1 className="text-base text-gray-400 font-semibold">
                  {r.name}
                </h1>
                <div className="flex flex-wrap gap-4">
                  {r.artists.map((a, i) => (
                    <p
                      key={i}
                      className="text-sm text-white bg-indigo-700 rounded shadow-lg px-2"
                    >
                      {a.name}
                    </p>
                  ))}
                </div>
                <Link className="text-white text-xs underline" href={r.album.external_urls.spotify}>
                  Go to Song
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recommended;
