import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "graphql/queries";
import {
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "graphql/subscriptions";

import Link from "components/Link/Link";

import { LINKS_PER_PAGE } from "utils/constants";

const LinkList = ({ ...props }) => {
  const isNewPage = props.location.pathname.includes("new");

  /**
   * [getQueryVariables description]
   */
  function getQueryVariables() {
    const page = parseInt(props.match.params.page, 10);
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? { createdAt: "desc" } : { createdAt: "asc" };
    return { take, skip, orderBy };
  }

  /***
   * [getLinksToRender description]
   */
  function getLinksToRender(links) {
    if (!links) return [];
    if (isNewPage) return links;
    const rankedLinks = links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  }

  /**
   * [nextPage description]
   */
  function nextPage(data) {
    const page = parseInt(props.match.params.page, 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      props.history.push(`/new/${nextPage}`);
    }
  }

  /**
   * [previousPage description]
   */
  function previousPage() {
    const page = parseInt(props.match.params.page, 10);
    if (page > 1) {
      const previousPage = page - 1;
      props.history.push(`/new/${previousPage}`);
    }
  }

  const { subscribeToMore, loading, error, data } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(),
  });

  /**
   * [subscribeToNewLinks description]
   */
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

  const pageIndex = props.match.params.page
    ? (props.match.params.page - 1) * LINKS_PER_PAGE
    : 0;

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
      <div className="mx-auto py-4 px-2 bg-white">
        {loading && !data && <span>Loading</span>}
        {error && <span>Error</span>}

        {data &&
          data?.feed?.links &&
          getLinksToRender(data?.feed?.links).map((link, index) => (
            <Link key={link.id} link={link} index={index + pageIndex} />
          ))}
      </div>
      {isNewPage && (
        <div className="mx-auto flex py-4 px-8 bg-white rounded-lg m-3">
          <div
            className="inline-block rounded py-2 px-4 mr-2 bg-gray-400 hover:bg-orange-500 text-white text-gray-800 hover:text-orange-900 cursor-pointer"
            onClick={() => previousPage()}
          >
            Previous
          </div>
          <div
            className="inline-block rounded py-2 px-4 mr-2 bg-gray-400 hover:bg-orange-500 text-white text-gray-800 hover:text-orange-900 cursor-pointer"
            onClick={() => nextPage(data)}
          >
            Next
          </div>
        </div>
      )}
    </>
  );
};

export default LinkList;
