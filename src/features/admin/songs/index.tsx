import * as React from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SmallAddIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";

import {
  AdminAllSongsQueryResult,
  useAdminAllSongsQuery,
  useAdminAllTagsQuery,
  useAdminCreateTagMutation,
  useAdminUpdateSongMutation,
} from "api";
import { renderResult } from "lib/render-result";
import { isDefinedAndNonNull } from "lib/utils";

export type Song = NonNullable<
  NonNullable<AdminAllSongsQueryResult["data"]>["allSongs"]["data"][0]
>;

const AdminSongs: NextPage = () => {
  const result = useAdminAllSongsQuery({
    variables: {},
  });
  const [newTag, setNewTag] = React.useState("");
  const [createTag, createResult] = useAdminCreateTagMutation({
    refetchQueries: ["AdminAllTags"],
    variables: {
      data: {
        name: newTag,
      },
    },
  });
  const { after, before } = result.data?.allSongs ?? {};
  const back = () => {
    result.fetchMore({
      variables: {
        cursor: before,
      },
    });
  };
  const forward = () => {
    result.fetchMore({
      variables: {
        cursor: after,
      },
    });
  };

  return (
    <Flex direction="column" overflowY="auto">
      <Flex justifyContent="space-between" px={4} mb={4}>
        <Heading as="h1" fontSize="2xl" mb={4} mr={4}>
          Avett Rx Songs
        </Heading>

        <Flex>
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            bg="white"
            mr={2}
          />
          <IconButton
            colorScheme="green"
            disabled={!newTag}
            isLoading={createResult.loading}
            aria-label="create tag"
            onClick={() => {
              setNewTag("");
              createTag();
            }}
            icon={<SmallAddIcon />}
          />
        </Flex>
      </Flex>
      {renderResult(result, {
        Loading,
        Empty,
        Success,
        Failure,
        isEmpty: (data) => !data.allSongs.data.some(Boolean),
        successSelector: (data) => data,
      })}
      <ButtonGroup display="flex" justifyContent="space-between">
        {before ? (
          <IconButton
            aria-label="Previous"
            icon={<ArrowLeftIcon />}
            onClick={back}
          />
        ) : null}
        {after ? (
          <IconButton
            ml="auto"
            aria-label="Next"
            icon={<ArrowRightIcon />}
            onClick={forward}
          />
        ) : null}
      </ButtonGroup>
    </Flex>
  );
};

export default AdminSongs;

const Loading: React.FC = () => {
  return <Spinner />;
};

const Empty = () => {
  return (
    <Text textStyle="warning">
      Oh snap! We don&apos;t have any tags to show yet.
    </Text>
  );
};

const SongTag: React.FC<{
  song: Pick<Song, "lyrics" | "_id" | "title">;
  tag: NonNullable<Song["tags"]["data"][0]>;
}> = ({ song, tag }) => {
  const toast = useToast();
  const [deleteTag, deleteResult] = useAdminUpdateSongMutation({
    variables: {
      id: song._id,
      data: {
        lyrics: song.lyrics,
        title: song.title,
        tags: {
          disconnect: [tag._id],
        },
      },
    },
    onError: (e) => {
      toast({
        title: "An error occurred.",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <Flex
      bg="purple.100"
      key={tag._id}
      mr="2"
      alignItems="center"
      rounded="full"
      pl={4}
      boxShadow="base"
    >
      <Text>{tag.name}</Text>
      <IconButton
        isLoading={deleteResult.loading}
        onClick={() => {
          deleteTag();
        }}
        _hover={{ color: "red.500" }}
        size="sm"
        aria-label="delete tag"
        icon={<SmallCloseIcon />}
        colorScheme="gray"
        variant="ghost"
      />
    </Flex>
  );
};

const SongTagAdd: React.FC<{
  song: Pick<Song, "lyrics" | "_id" | "title">;
  tag: NonNullable<Song["tags"]["data"][0]>;
}> = ({ song, tag }) => {
  const toast = useToast();
  const [addTag, addResult] = useAdminUpdateSongMutation({
    variables: {
      id: song._id,
      data: {
        lyrics: song.lyrics,
        title: song.title,
        tags: {
          connect: [tag._id],
        },
      },
    },
    onError: (e) => {
      toast({
        title: "An error occurred.",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <Flex
      bg="gray.50"
      mr="2"
      display="flex"
      alignItems="center"
      rounded="full"
      pl={4}
      boxShadow="base"
    >
      <Text whiteSpace="nowrap">{tag.name}</Text>
      <IconButton
        isLoading={addResult.loading}
        onClick={() => {
          addTag({
            variables: {
              id: song._id,
              data: {
                lyrics: song.lyrics,
                title: song.title,
                tags: {
                  connect: [tag._id],
                },
              },
            },
          });
        }}
        _hover={{ color: "green.500" }}
        size="sm"
        variant="ghost"
        aria-label="add tag"
        icon={<SmallAddIcon />}
      ></IconButton>
    </Flex>
  );
};

export type SongRowProps = { song: Song };
export const SongRow: React.FC<SongRowProps> = ({ song }) => {
  const { data, loading } = useAdminAllTagsQuery();
  const tags = (data?.allTags.data ?? []).filter(isDefinedAndNonNull);

  return (
    <Flex
      direction="column"
      fontSize="4xl"
      _notLast={{ mb: 4 }}
      boxShadow="base"
      px="6"
      py="4"
      rounded="md"
      bg="white"
      justifyContent="space-between"
    >
      <Flex alignItems="baseline" mb={4} flexWrap="wrap">
        <Text
          as="h3"
          color="purple.700"
          fontSize="md"
          fontWeight="bold"
          lineHeight="shorter"
          mr="2"
        >
          {song.title}
        </Text>

        <Text color="gray.500" fontSize="sm">
          {song.album.title}
        </Text>
      </Flex>

      <Flex direction="column">
        {song.tags.data.length > 0 ? (
          <List display="flex" overflowX="auto" pb={4}>
            {song.tags.data.filter(isDefinedAndNonNull).map((tag) => (
              <ListItem key={tag._id}>
                <SongTag
                  song={{
                    _id: song._id,
                    lyrics: song.lyrics,
                    title: song.title,
                  }}
                  tag={tag}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Text mb="4" textStyle="warning">
            No tags for this song
          </Text>
        )}
        <List display="flex" overflowX="auto" pb={1}>
          {loading ? (
            <Spinner />
          ) : (
            tags
              .filter((tag) => !song.tags.data.find((t) => t?._id === tag._id))
              .map((tag) => (
                <ListItem key={tag._id}>
                  <SongTagAdd
                    song={{
                      _id: song._id,
                      lyrics: song.lyrics,
                      title: song.title,
                    }}
                    tag={tag}
                  />
                </ListItem>
              ))
          )}
        </List>
      </Flex>
    </Flex>
  );
};

const Success: React.FC<{
  data: NonNullable<AdminAllSongsQueryResult["data"]>;
}> = ({ data }) => {
  const songs = data.allSongs.data.filter(isDefinedAndNonNull) ?? [];
  return (
    <List
      display="flex"
      aria-label="tags list"
      flexDirection="column"
      overflowY="auto"
      px={4}
    >
      {songs.map((song) => (
        <ListItem key={song._id} mb="4">
          <SongRow song={song} />
        </ListItem>
      ))}
    </List>
  );
};

type FetchError = NonNullable<AdminAllSongsQueryResult["error"]>;
const Failure: React.FC<{ error: FetchError }> = ({ error }) => {
  console.error(error);
  return (
    <Text textStyle="error">
      Oh no! Something went wrong fetching that data.
    </Text>
  );
};
