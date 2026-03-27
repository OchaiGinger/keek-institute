import { Navbar } from "./_components/Navbar";
import React from "react";

const LayoutPublic = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="px-4 sm:px-0 mb-32">{children}</main>
    </div>
  );
};

export default LayoutPublic;
