import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { readUser, readUsers } from './db';
import { publicProcedure, router } from "./trpc";


const appRouter = router({
  getUsers: publicProcedure.query(async () => {
    const user = await readUsers();
    return user;
  }),
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await readUser(input);
  }),
  parrot: publicProcedure.input(z.string()).query(({ input }) => {
    return input
  }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
	router: appRouter
})

server.listen(3000)
