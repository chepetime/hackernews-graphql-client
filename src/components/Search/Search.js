import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FEED_SEARCH_QUERY } from "graphql/queries";
import Link from "components/Link/Link";

export default function Search() {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("");

  const [executeSearch, { loading, data }] = useLazyQuery(FEED_SEARCH_QUERY, {
    onCompleted() {
      setLinks(data.feed.links);
    },
  });

  return (
    <div>
      <div>
        Search
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter },
            })
          }
        >
          OK
        </button>
      </div>
      {loading && <span>Searching...</span>}
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}
