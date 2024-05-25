import React from "react";
import { Navbar, Typography } from "@material-tailwind/react";

function Header() {
  return (
    <Navbar className="mx-auto max-w-screen-xxl bg-gradient-to-r from-blue-500 to-blue-900 px-4 py-3 flex justify-center">
      <Typography
        variant="h6"
        className="cursor-pointer text-2xl text-white"
        onClick={() => window.location.reload()}
      >
        DNS DASHBOARD
      </Typography>
    </Navbar>
  );
}

export default Header;
