"use client";
import { useTRPC } from "@/lib/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface PageClientProps {}

const PageClient: FC<PageClientProps> = ({}) => {
    const trpc = useTRPC();
    const { data, isLoading } = useQuery(
        trpc.users.getAmountOfUsers.queryOptions({})
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-0">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl font-semibold text-white">
                        Aktive bans
                    </h1>
                    <span className="text-sm text-secondary-foreground">
                        {isLoading ? "0" : data?.amount ?? 0} aktive bans
                    </span>
                </div>
                <div className="flex flex-row items-center gap-2"></div>
            </div>
        </div>
    );
};

export default PageClient;
