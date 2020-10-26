import * as React from "react";

import { useGetTagsQuery } from "api";
import Loading from "components/loading";

const ViewTags: React.FC = () => {
  const { data, loading } = useGetTagsQuery();
  const tags = (data && data.allTags.data) || [];

  return (
    <ul className="flex w-full overflow-x-scroll justify-center">
      {loading ? (
        <Loading />
      ) : (
        tags.map((tag) =>
          tag ? (
            <li className="mr-4 last:mr-0 text-2xl" key={tag._id}>
              {tag.name}
            </li>
          ) : null
        )
      )}
    </ul>
  );
};

export default ViewTags;
