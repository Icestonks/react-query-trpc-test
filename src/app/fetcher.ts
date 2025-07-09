import { queryOptions } from "@tanstack/react-query";

export function getAmountOfUsers() {
    return queryOptions({
        queryKey: ["users", "amount"],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1));
            return {
                amount: 10,
            }
        },
    });
}
