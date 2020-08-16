import React from "react";

const Link = ({ link: { description = "", url = "" } }) => {
  return (
    <div>
      <div>
        {description} ({url})
      </div>
    </div>
  );
};

export default Link;
