import React from "react";
import PageClient from "./page-client";
import { prefetch, trpc } from "@/lib/trpc/server";

export default function page() {
    prefetch(trpc.users.getAmountOfUsers.queryOptions({}));
    return (
        <div className="mx-auto container lg:max-w-7xl mb-5 mt-28 px-4">
            <PageClient />
        </div>
    );
}
