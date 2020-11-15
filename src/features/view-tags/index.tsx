import * as React from "react";
import { List, ListItem, Spinner, Text } from "@chakra-ui/react";

import { useGetTagsQuery } from "api";

const ViewTags: React.FC = () => {
  const { data, loading } = useGetTagsQuery();
  const tags = (data && data.allTags.data) || [];

  return (
    <List display="flex" w="100%" overflowX="auto" justifyContent="center">
      {loading ? (
        <Spinner color="purple.600" />
      ) : tags.length === 0 ? (
        <Text color="gray.500">
          Oh no! It looks like there are no tags to show. 😢
        </Text>
      ) : (
        tags.map((tag) =>
          tag ? (
            <ListItem
              key={tag._id}
              _notLast={{ mr: 4 }}
              fontSize="3xl"
              size="xl"
            >
              {tag.name}
            </ListItem>
          ) : null
        )
      )}
    </List>
  );
};

export default ViewTags;
