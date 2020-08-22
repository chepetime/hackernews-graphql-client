import React from "react";
import { useMutation } from "@apollo/client";
import { VOTE_MUTATION } from "graphql/mutations";
import { AUTH_TOKEN } from "utils/constants";

import { timeDifferenceForDate } from "utils/helpers";

const Link = ({ link, index }) => {
  const [voteMutation] = useMutation(VOTE_MUTATION, {
    onCompleted: () => {},
  });
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{(index || 0) + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            onClick={() => voteMutation({ variables: { linkId: link.id } })}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link?.description} ({link?.url})
        </div>
        <div className="f6 lh-copy gray">
          {link?.votes?.length || 0} votes | by{" "}
          {link?.postedBy ? link?.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link?.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;
