import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Link from "next/link";
import { getAmountOfUsers } from "./fetcher";
import PageClient from "./page-client";
import { getServerQueryClient } from "@/lib/server/getQueryClient";

export default async function Page() {
  const queryClient = getServerQueryClient();

  void queryClient.prefetchQuery(getAmountOfUsers());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      Test data:
      <Link href={"/test"}>Test Page</Link>
      <PageClient />
    </HydrationBoundary>
  );
}
