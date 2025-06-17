"use client";
import { useTRPC } from "@/lib/trpc/react";
import { useQuery } from "@tanstack/react-query";

const PageClient = ({}) => {
    const trpc = useTRPC();

    const { data, isLoading } = useQuery(
        trpc.users.getAmountOfUsers.queryOptions({})
    );

    return <div>Amount of users: {isLoading ? "0" : data?.amount}</div>;
};

export default PageClient;
