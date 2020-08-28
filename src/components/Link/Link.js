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

  const isLoggedIn =
    authToken &&
    authToken !== "false" &&
    authToken !== "undefined" &&
    authToken !== "";

  return (
    <div className="mx-auto flex py-2 px-6 bg-white rounded-lg">
      <div
        className="flex bg-blue-200 hover:bg-blue-500 p-3 mr-2 rounded-lg text-blue-500 hover:text-blue-100 cursor-pointer h-12 max-h-full"
        onClick={() =>
          isLoggedIn
            ? voteMutation({ variables: { linkId: link.id } })
            : () => {}
        }
      >
        <span className="gray">{(index || 0) + 1}.</span>
        {isLoggedIn && <div className="">▲</div>}
      </div>
      <div className="px-2">
        <div>
          <h2 className="text-lg">{link?.description}</h2>
          <span className="text-sm">({link?.url})</span>
        </div>
        <div className="text-base">
          {link?.votes?.length || 0} votes | by{" "}
          {link?.postedBy ? link?.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link?.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;
