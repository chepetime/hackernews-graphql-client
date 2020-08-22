import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_MUTATION } from "graphql/mutations";

export default function CreateLink({ history }) {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [postMutation] = useMutation(POST_MUTATION, {
    onCompleted() {
      history.push("/");
    },
  });

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>

      <button onClick={() => postMutation({ variables: { description, url } })}>
        Submit
      </button>
    </div>
  );
}
