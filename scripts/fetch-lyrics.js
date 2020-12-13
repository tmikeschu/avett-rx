const fetch = require("cross-fetch");
const jsdom = require("jsdom");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config({ path: ".env.local" });

const TOTAL_PAGES = 5;
const MAX_PER_PAGE = 50;
const BASE_URL = "https://api.genius.com";
const AVETT_ID = "17688";
const ACCESS_KEY = process.env.GENIUS_ACCESS_KEY;

// map a dictionary to a query string
const toQS = (obj) =>
  Object.entries(obj).reduce((acc, kv) => {
    return `${acc}&${kv.join("=")}`;
  }, "");

const PAGES = Array.from({ length: Math.ceil(TOTAL_PAGES) }, (_, i) => i + 1);

const main = async () => {
  const songIds = (
    await Promise.all(
      PAGES.map((page) =>
        fetch(
          `${BASE_URL}/artists/${AVETT_ID}/songs?${toQS({
            per_page: MAX_PER_PAGE,
            page,
          })}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_KEY}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            return data.response.songs.map((s) => s.id);
          })
      )
    )
  ).flat();

  const songs = await Promise.all(
    songIds.map((id) =>
      fetch(`${BASE_URL}/songs/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_KEY}`,
        },
      })
        .then((res) => res.json())
        .then(async (json) => {
          const { id, url, title, album } = json.response.song;

          if (album) {
            const lyrics = await fetch(url)
              .then((res) => res.text())
              .then((html) => {
                const dom = new jsdom.JSDOM(html);
                const text = dom.window.document.querySelector(".lyrics")
                  .textContent;
                return text.trim();
              });

            return {
              id,
              url,
              title,
              albumTitle: album.name,
              albumId: album.id,
              lyrics,
            };
          }
          return null;
        })
    )
  ).then((data) => {
    return data.filter(Boolean);
  });

  fs.writeFileSync("./songs-with-lyrics.json", JSON.stringify(songs), "utf8");
};

main();
