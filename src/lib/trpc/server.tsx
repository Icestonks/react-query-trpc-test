import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";

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
