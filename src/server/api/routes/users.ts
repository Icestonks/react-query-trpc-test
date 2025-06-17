import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
    getAmountOfUsers: publicProcedure
        .input(z.object({}))
        .query(async ({ input }) => {
            await new Promise((resolve) => setTimeout(resolve, 50));

            console.log("Fetching amount of users...");
            return {
                amount: 100,
            };
        }),
});
