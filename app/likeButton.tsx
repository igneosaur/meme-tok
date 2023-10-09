"use client";

import { useState } from "react";

type Like = {
  id: string;
  created_at: Date;
  user_id: string;
  gif_id: string;
};

export type LikeButtonProps = {
  gifID: string;
  likes: Like[];
};

export default function LikeButton({
  gifID,
  likes: initialLikes,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/likes/${gifID}`, {
        method: "POST",
      });
      const { isAdded, data } = await response.json();
      if (isAdded) {
        setLikes([...likes, data]);
        setIsLiked(true);
      } else {
        setLikes(likes.filter(({ id }) => id !== data.id));
        setIsLiked(false);
      }
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="bg-black p-2 hover:bg-gray-900 disabled:opacity-50"
      title="Like"
    >
      {isLiked ? "🤍 " : "♡ "}
      {likes.length}
    </button>
  );
}
