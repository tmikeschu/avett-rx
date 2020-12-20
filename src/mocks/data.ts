import { newAlbum, newSong, newTag } from "api";

export const EMOJIS = {
  inLove: "🥰",
  balling: "😭",
  happy: "😊",
  sad: "😔",
  wild: "🤪",
} as const;

export const tags = Object.values(EMOJIS).map((t) => newTag({ name: t }));

export const songs = [
  {
    title: "Sanguine",
    lyrics: "Make me sanguine\nHelp me genuinely",
    album: newAlbum({ title: "The Gleam" }),
  },
  null,
].map((s) => (s ? newSong(s) : s));

if (tags[0]?.songs && songs[0]) {
  tags[0].songs.data = [songs[0]];
}
