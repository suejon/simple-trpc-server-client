import fs from 'fs';

type User = {
    _id: string;
    name: string;
    age: number;
  }

const USERS_DB = './server/db/users.json'

export const readUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      fs.readFile(USERS_DB, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          try {
            const jsonData = JSON.parse(data);
            const users: User[] = jsonData;
            resolve(users);
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  };

  export const readUser = (id: string): Promise<User | undefined> => {
    return new Promise((resolve, reject) => {
      fs.readFile(USERS_DB, 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          try {
            const jsonData = JSON.parse(data);
            const users: User[] = jsonData;
            resolve(users.find(user => user._id === id));
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  };