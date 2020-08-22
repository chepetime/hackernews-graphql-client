import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "graphql/queries";
import {
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "graphql/subscriptions";

import Link from "components/Link/Link";

const LinkList = () => {
  const { subscribeToMore, loading, error, data } = useQuery(FEED_QUERY);

  const subscribeToNewLinks = subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  const subscribeToNewVotes = subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      subscribeToNewLinks();
      subscribeToNewVotes();
    }
    return () => {
      isMounted = false;
    };
  }, [subscribeToNewLinks, subscribeToNewVotes]);

  return (
    <>
      {loading && !data && <span>Loading</span>}
      {error && <span>Error</span>}
      {data &&
        data?.feed?.links &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default LinkList;
