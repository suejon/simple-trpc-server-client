import { publicProcedure, router } from "./trpc";
import { string } from 'valibot'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
	userList: publicProcedure
		.input(string())
		.query(async ({ input }) => {
			return await new Promise((resolve) => {
				setTimeout(() => {
					resolve([{ "id": 1, "name": "You said:" + input }])
				})
			})

		})
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
	router: appRouter
})

server.listen(3000)
