import React, { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { FEED_SEARCH_QUERY } from "graphql/queries";
import Link from "components/Link/Link";

export default function Search() {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("");
  const searchInput = useRef(null);

  const [executeSearch, { loading, data }] = useLazyQuery(FEED_SEARCH_QUERY, {
    onCompleted() {
      setLinks(data.feed.links);
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      searchInput.current.focus();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="flex p-6 bg-orange-700 mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executeSearch({
              variables: { filter },
            });
          }}
        >
          <div className="flex max-w-xl">
            <span className="p-3 mr-2 text-white">Search</span>
            <input
              ref={searchInput}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              onChange={(e) => setFilter(e.target.value)}
            ></input>
            <button className="inline-block rounded py-2 px-4 ml-2 bg-gray-400 hover:bg-orange-500 text-white text-gray-800 hover:text-orange-900 cursor-pointer">
              OK
            </button>
          </div>
        </form>
      </div>
      <div className="mx-auto py-4 px-2 bg-white">
        {loading && <span>Searching...</span>}
        {links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    </>
  );
}
