import React from "react";
import Recommended from "@/components/Recommended";
import Search from "@/components/Search";
import querystring from 'querystring'

async function page() {
  return (
    <main>
      <Search />
      <Recommended />
    </main>
  );
}

export default page;
