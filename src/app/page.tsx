import { trpc } from "@/lib/trpc/server";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PageClient from "./page-client";
import Link from "next/link";

export default async function Page() {
    // prefetch(trpc.users.getAmountOfUsers.queryOptions());
    const queryClient = new QueryClient()

    void queryClient.prefetchQuery(trpc.users.getAmountOfUsers.queryOptions({}));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            Test data:
            <Link href={"/test"}>Test Page</Link>
            <PageClient />
        </HydrationBoundary>
    );
}
