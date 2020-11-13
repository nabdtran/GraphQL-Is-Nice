const express = require('express');

const { graphqlHTTP } = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');


const app = express();


//Array of authors
const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]


//Array of books
const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]


//Graphiql will render this schema which can be used to query or mutate data
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  });


//Use graphiql interface to query and mutate data following the schema above at /graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(5000, () => console.log('Server Running'));