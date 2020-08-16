import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "components/Link/Link";

const FEED_QUERY = gql`
  query {
    feed {
      count
      links {
        id
        description
        url
        createdAt
      }
    }
  }
`;

const LinkList = () => {
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const linksToRender = data.feed.links;

        return (
          <div>
            <span>{data.feed.count}</span>
            {linksToRender.map((link) => (
              <Link key={link.id} link={link} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;
