import React from "react";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import PageClient from "./page-client";
import { trpc } from "@/lib/trpc/server";

export default function page() {
    const queryClient = new QueryClient()

    void queryClient.prefetchQuery(trpc.users.getAmountOfUsers.queryOptions({}));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="mx-auto container lg:max-w-7xl mb-5 mt-28 px-4">
                <PageClient />
            </div>
        </HydrationBoundary>
    );
}
