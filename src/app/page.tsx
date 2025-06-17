import { getQueryClient, HydrateClient, trpc } from "@/lib/trpc/server";
import PageClient from "./page-client";
import Link from "next/link";

export default async function Page() {
    // prefetch(trpc.users.getAmountOfUsers.queryOptions());
    const queryClient = getQueryClient();

    queryClient.prefetchQuery(trpc.users.getAmountOfUsers.queryOptions({}));

    return (
        <HydrateClient>
            Test data:
            <Link href={"/test"}>Test Page</Link>
            <PageClient />
        </HydrateClient>
    );
}
