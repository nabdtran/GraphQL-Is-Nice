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

//The Specification for a book
const BookType = new GraphQLObjectType({
    name : 'Book',
    description : "A Book That Has an Author",
    fields : () =>  ({
        //All the attributes of the book must not be null
      id : { type : GraphQLNonNull(GraphQLInt)} ,
      name : { type : GraphQLNonNull(GraphQLString)},
      authorId : {type : GraphQLNonNull(GraphQLInt)},
       
    })
})

//Root Query
const RootQueryType = new GraphQLObjectType({ 
  name : 'Queries',
  description : "Queries for books and authors, in their singular forms too can be found in me",
  fields : () => ({
      //Querying all books returns a list of all the books conforming to the book type
      books : {
          type : GraphQLList(BookType),
          description : "Lists all the books that can be queried",
          //Querying for books should return all books that fit the BookType Specification
          resolve : () => books
      }
  })                                           
})

//Graphiql will render this schema which can be used to query or mutate data
const schema = new GraphQLSchema({
    //We can basically only query and mutate(change) data so those are the keys of our schema
    query: RootQueryType,
    // mutation: RootMutationType
  });


//Use graphiql interface to query and mutate data following the schema above at /graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(5000, () => console.log('Server Running'));