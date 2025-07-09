"use client";

import { useQuery } from "@tanstack/react-query";
import { getAmountOfUsers } from "./fetcher";

const PageClient = ({}) => {
  const { data, isLoading } = useQuery(getAmountOfUsers());

  return (
    <div>Amount of users: {isLoading ? <em>Loading...</em> : data?.amount}</div>
  );
};

export default PageClient;
