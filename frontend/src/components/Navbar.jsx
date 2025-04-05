import React from "react";

const Navbar = () => {
  return (
    <nav className="p-2  bg-white flex items-center ">
      <div className="h-16 w-28 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-full object-contain"
        />
      </div>
    </nav>
  );
};

export default Navbar;
