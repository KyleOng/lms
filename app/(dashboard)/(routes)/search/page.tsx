import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/Categories";
import { SearchInput } from "@/components/search-input";

type Props = {};

async function SearchPage({}: Props) {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
}

export default SearchPage;
