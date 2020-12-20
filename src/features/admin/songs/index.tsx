import * as React from "react";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";

import {
  AdminAllSongsQueryResult,
  useAdminAllSongsQuery,
  useAdminAllTagsQuery,
} from "api";
import { renderResult } from "lib/render-result";
import { isDefinedAndNonNull } from "lib/utils";

export type Song = NonNullable<
  NonNullable<AdminAllSongsQueryResult["data"]>["allSongs"]["data"][0]
>;

const AdminSongs: NextPage = () => {
  const result = useAdminAllSongsQuery();
  return (
    <Flex direction="column" overflowY="auto">
      <Heading as="h1" fontSize="2xl" mb={4}>
        Avett Rx Songs
      </Heading>
      {renderResult(result, {
        Loading,
        Empty,
        Success,
        Failure,
        isEmpty: (data) => !data.allSongs.data.some(Boolean),
        successSelector: (data) =>
          data.allSongs.data.filter((d) => d?._id) as Song[],
      })}
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

export type SongRowProps = { song: Song };
export const SongRow: React.FC<SongRowProps> = ({ song }) => {
  const { data } = useAdminAllTagsQuery();
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
              <ListItem
                bg="purple.50"
                key={tag._id}
                mr="2"
                display="flex"
                alignItems="center"
                rounded="md"
                pl={4}
                py={1}
                boxShadow="base"
              >
                <Text>{tag.name}</Text>
                <IconButton
                  _hover={{ color: "red.500" }}
                  size="sm"
                  aria-label="delete tag"
                  icon={<DeleteIcon />}
                  colorScheme="gray"
                  variant="ghost"
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Text mb="4" textStyle="warning">
            No tags for this song
          </Text>
        )}
        <List display="flex" overflowX="auto" pb={4}>
          {tags
            .filter((tag) => !song.tags.data.find((t) => t?._id === tag._id))
            .map((tag) => (
              <ListItem
                bg="gray.50"
                key={tag._id}
                mr="2"
                display="flex"
                alignItems="center"
                rounded="md"
                pl={4}
                py={1}
                boxShadow="base"
              >
                <Text whiteSpace="nowrap">{tag.name}</Text>
                <IconButton
                  _hover={{ color: "green.500" }}
                  size="sm"
                  variant="ghost"
                  aria-label="add tag"
                  icon={<PlusSquareIcon />}
                ></IconButton>
              </ListItem>
            ))}
        </List>
      </Flex>
    </Flex>
  );
};

const Success: React.FC<{ data: Song[] }> = ({ data: songs }) => {
  return (
    <List
      display="flex"
      aria-label="tags list"
      flexDirection="column"
      overflowY="auto"
      px={4}
    >
      {songs.map((song) => (
        <ListItem key={song._id}>
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
