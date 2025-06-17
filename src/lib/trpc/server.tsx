import "server-only";

import { headers } from "next/headers";
import { cache, Suspense } from "react";

import {
    createTRPCOptionsProxy,
    type TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
    const heads = new Headers(await headers());
    heads.set("x-trpc-source", "rsc");

    return createTRPCContext({
        headers: heads,
    });
});

export const getQueryClient = cache(createQueryClient);

/**
 * Det er den her, som skal bruges til at kalde tRPC fra en React Server Component.
 * Der bliver ikke cachet noget af dette over til clienten, så det er kun til serveren.
 * https://trpc.io/docs/client/tanstack-react-query/server-components#getting-data-in-a-server-component
 */
export const caller = appRouter.createCaller(createContext);

export const trpc = createTRPCOptionsProxy({
    ctx: createContext,
    router: appRouter,
    queryClient: getQueryClient,
});

export function HydrateClient(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {props.children}
        </HydrationBoundary>
    );
}

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
    queryOptions: T
) {
    const queryClient = getQueryClient();
    if (queryOptions.queryKey[1]?.type === "infinite") {
        void queryClient.prefetchInfiniteQuery(queryOptions as never);
    } else {
        void queryClient.prefetchQuery(queryOptions);
    }
}

export function bathPrefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
    queryOptionsArray: T[]
) {
    const queryClient = getQueryClient();

    for (const queryOptions of queryOptionsArray) {
        if (queryOptions.queryKey[1]?.type === "infinite") {
            void queryClient.prefetchInfiniteQuery(queryOptions as never);
        } else {
            void queryClient.prefetchQuery(queryOptions);
        }
    }
}

export function HydrateSuspense({
    children,
    fallback,
    errorFallback,
}: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    errorFallback?: React.ReactNode;
}) {
    return (
        <HydrateClient>
            <ErrorBoundary
                fallback={errorFallback ?? <div>{"Noget gik galt"}</div>}
            >
                <Suspense fallback={fallback ?? <div>{"Loading..."}</div>}>
                    {children}
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    );
}
