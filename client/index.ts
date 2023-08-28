import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:3000"
		})
	]
})


async function main() {
	const payload = await trpc.userList.query("hello");
	// const payload = await trpc.parrot.query("hi");
	console.log(payload);
}

main().catch(console.error);