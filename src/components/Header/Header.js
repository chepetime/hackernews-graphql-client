import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "context/auth";

export default function Header() {
  const { authToken, setAuthToken } = useAuth();

  const isLoggedIn =
    authToken &&
    authToken !== "false" &&
    authToken !== "undefined" &&
    authToken !== "";

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-orange-500 pt-2 pb-2 pr-6 pl-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" className="font-semibold text-xl tracking-tight">
            Hacker News Mx
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to="/"
              className="block p-4 lg:inline-block lg:mt-0 text-orange-800 hover:text-white mr-4"
            >
              new
            </Link>

            <Link
              to="/top"
              className="block p-4 lg:inline-block lg:mt-0 text-orange-800 hover:text-white mr-4"
            >
              top
            </Link>
            <Link
              to="/search"
              className="block p-4 lg:inline-block lg:mt-0 text-orange-800 hover:text-white mr-4"
            >
              search
            </Link>
            {isLoggedIn && (
              <Link
                to="/create"
                className="block p-4 lg:inline-block lg:mt-0 text-orange-800 hover:text-white mr-4"
              >
                submit
              </Link>
            )}
          </div>
          <div>
            {isLoggedIn ? (
              <Link
                to="/"
                className="inline-block border border-orange-500 rounded py-2 px-4 bg-orange-700 hover:bg-orange-300 text-white"
                onClick={() => {
                  setAuthToken(false);
                }}
              >
                logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block border border-orange-500 rounded py-2 px-4 bg-orange-700 hover:bg-orange-300 text-white"
              >
                login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
