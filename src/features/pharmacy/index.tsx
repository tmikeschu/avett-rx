import * as React from "react";

import {
  PharmacySongFragment,
  useGetTagsQuery,
  useSongsForTagLazyQuery,
} from "api";
import Button from "components/button";
import Text from "components/text";
import { nl2br, randomElement } from "lib/utils";

const Pharmacy: React.FC = () => {
  const [tagID, setTagID] = React.useState("");
  const [songs, setSongs] = React.useState<PharmacySongFragment[]>([]);
  const [song, setSong] = React.useState<PharmacySongFragment | null>(null);
  const { data, loading } = useGetTagsQuery();
  const [getSong, { data: songData }] = useSongsForTagLazyQuery();
  const tags = data?.allTags?.data || [];

  React.useEffect(() => {
    if (songData?.songsForTag?.data) {
      const rando = randomElement(songData.songsForTag.data);
      setSongs(
        songData.songsForTag.data.filter(Boolean) as PharmacySongFragment[]
      );
      setSong(rando || null);
    }
  }, [songData]);

  return (
    <div className="w-full">
      <Text variant="h2" className="mb-4">
        Pharmacy
      </Text>
      {loading ? (
        <Text variant="caption">Loading...</Text>
      ) : (
        <>
          <Text variant="subtitle">Select a feeling</Text>
          <ul className="flex">
            {tags.map((tag) =>
              tag ? (
                <li
                  key={tag._id}
                  className={`mr-4 ${
                    tag._id === tagID ? "bg-primary bg-opacity-25 rounded" : ""
                  }`}
                >
                  <Button
                    variant="icon"
                    size="lg"
                    onClick={() => {
                      if (!song || tag._id !== tagID) {
                        setTagID(tag._id);
                        getSong({ variables: { tagID: tag._id } });
                      } else {
                        let rando: PharmacySongFragment | undefined;
                        if (songs.length > 1) {
                          while (!rando || rando._id === song._id) {
                            rando = randomElement(songs);
                          }
                          setSong(rando || null);
                        }
                      }
                    }}
                  >
                    {tag.name}
                  </Button>
                </li>
              ) : null
            )}
          </ul>
        </>
      )}

      <div className="mt-4">
        {song ? (
          <>
            <div className="mb-4">
              <Text variant="h3" className="">
                {song.title}
              </Text>
              <Text variant="caption">From: {song.album.title}</Text>
            </div>

            <Text variant="body1" className="text-sm italic">
              {nl2br(song.lyrics)}
            </Text>
          </>
        ) : tagID ? (
          <div className="mb-4">
            <Text variant="subtitle" className="">
              Oh no 😢. We haven&apos;t tagged any songs with this yet.
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Pharmacy;
