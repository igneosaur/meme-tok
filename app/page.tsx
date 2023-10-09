import { getTrendingData } from "@/lib/giphy";
import Image from "next/image";
import LikeButton from "./likeButton";
import prisma from "@/lib/prisma";

export default async function Home() {
  const gifs = await getTrendingData({ limit: 10, rating: "g" });
  const allLikes = await prisma.likes.findMany();
  return (
    <main className="main bg-zinc-800/30 h-screen overflow-auto snap-mandatory snap-y">
      {gifs.map(({ id, images, title }) => {
        const gif_id = String(id);
        const likes = allLikes.filter((like) => like.gif_id === gif_id);
        return (
          <section
            id={gif_id}
            key={gif_id}
            className="h-screen snap-center relative p-5"
          >
            <Image
              className="w-full h-screen object-cover absolute top-0 left-0 z-[-1]"
              src={images.original.webp}
              alt={title}
              width={512}
              height={512}
              priority
            />
            <LikeButton gifID={gif_id} likes={likes} />
          </section>
        );
      })}
    </main>
  );
}
