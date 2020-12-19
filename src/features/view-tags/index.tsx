import * as React from "react";
import { List, ListItem, Spinner, Text } from "@chakra-ui/react";

import { GetTagsQueryResult, useGetTagsQuery } from "api";
import { renderResult } from "lib/render-result";

type Tag = NonNullable<
  NonNullable<GetTagsQueryResult["data"]>["allTags"]["data"][0]
>;

const ViewTags: React.FC = () => {
  const result = useGetTagsQuery();
  return renderResult(result, {
    Loading,
    Failure,
    Success,
    Empty,
    isEmpty: (data) => !data.allTags.data.some(Boolean),
    successSelector: (data) => data.allTags.data.filter((d) => d?._id) as Tag[],
  });
};

export default ViewTags;

const Loading: React.FC = () => {
  return <Spinner />;
};

const Empty = () => {
  return (
    <Text
      color="yellow.600"
      backgroundColor="yellow.100"
      px={4}
      py={2}
      rounded="md"
    >
      Oh snap! We don&apos;t have any tags to show yet.
    </Text>
  );
};

const Success: React.FC<{ data: Tag[] }> = ({ data: tags }) => {
  return (
    <List display="flex" aria-label="tags list">
      {tags.map((tag) => (
        <ListItem key={tag._id} fontSize="4xl" _notLast={{ mr: 4 }}>
          {tag.name}
        </ListItem>
      ))}
    </List>
  );
};

type FetchError = NonNullable<GetTagsQueryResult["error"]>;
const Failure: React.FC<{ error: FetchError }> = ({ error }) => {
  console.error(error);
  return (
    <Text color="red.600" backgroundColor="red.100" px={4} py={2} rounded="md">
      Oh no! Something went wrong fetching that data.
    </Text>
  );
};
