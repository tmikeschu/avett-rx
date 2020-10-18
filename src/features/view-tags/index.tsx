import * as React from "react";

import { useGetTagsQuery } from "api";
import Text from "components/text";

const ViewTags: React.FC = () => {
  const { data, loading } = useGetTagsQuery();
  const tags = (data && data.allTags.data) || [];

  return (
    <div>
      <Text variant="h2">Tags</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        tags.map((tag) => (tag ? <div key={tag._id}>{tag.name}</div> : null))
      )}
    </div>
  );
};

export default ViewTags;
