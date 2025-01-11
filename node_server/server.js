const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

// Шлях до JSON-файлу
const DATA_FILE = path.join(__dirname, 'users.json');

// Функція для зчитування даних із JSON-файлу
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Якщо файл не існує, повертаємо порожній масив
      return [];
    }
    throw error;
  }
};

// Функція для запису даних у JSON-файл
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// Схема GraphQL
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(input: UserInput!): User
  }
`);

// Резолвери
const root = {
  users: () => {
    return readData();
  },
  createUser: ({ input }) => {
    const users = readData();
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      ...input,
    };
    users.push(newUser);
    writeData(users);
    return newUser;
  },
};

// Створення сервера Express
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Увімкнення GraphiQL для тестування
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
