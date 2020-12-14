require("cross-fetch/polyfill");
const dotenv = require("dotenv");
const { GraphQLClient, gql } = require("graphql-request");

const songs = require("../songs-with-lyrics.json");

dotenv.config({ path: ".env.local" });

const URI = process.env.NEXT_PUBLIC_FAUNA_GRAPHQL_URI;

const client = new GraphQLClient(URI, {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`,
  },
});

const main = async () => {
  const songsByAlbum = songs.reduce((acc, { albumId, albumTitle, ...song }) => {
    if (!acc[albumId]) {
      acc[albumId] = { id: albumId, title: albumTitle, songs: [] };
    }
    acc[albumId].songs.push(song);
    return acc;
  }, {});
  Object.entries(songsByAlbum).forEach(async ([, album]) => {
    const albumId = await client
      .request(
        gql`
          mutation CreateAlbum($data: AlbumInput!) {
            createAlbum(data: $data) {
              _id
            }
          }
        `,
        { data: { title: album.title } }
      )
      .then((response) => response.createAlbum._id)
      .catch(console.error);

    await Promise.all(
      album.songs.map((song) => {
        return client.request(
          gql`
            mutation CreateSong($data: SongInput!) {
              createSong(data: $data) {
                _id
              }
            }
          `,
          {
            data: {
              title: song.title,
              lyrics: song.lyrics,
              album: {
                connect: albumId,
              },
            },
          }
        );
      })
    )
      .then((results) => {
        console.log(`Uploaded ${results.length} songs`);
      })
      .catch(console.error);
  });
};

main();
