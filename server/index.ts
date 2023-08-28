import { createHTTPServer } from '@trpc/server/adapters/standalone';
import fs from 'fs';
import { z } from 'zod';
import { publicProcedure, router } from "./trpc";

type User = {
  name: string;
  age: number;
}

const readUser = (filePath: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        try {
          const jsonData = JSON.parse(data);
          const user: User = {
            name: jsonData.name,
            age: jsonData.age,
          }
          resolve(user);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};

const appRouter = router({
  userList: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await readUser('./server/user.json');
    return user;
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
