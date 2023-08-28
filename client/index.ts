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
	const payload = await trpc.getUser.query("64ec93d3e328cafc95dff9d7")
	// const payload = await trpc.parrot.query("hi");
	console.log(payload);
}

main().catch(console.error);