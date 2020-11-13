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
      //Query the author of the given book
      author: {
        type: AuthorType,
        resolve: (book) => {
          return authors.find(author => author.id === book.authorId)
        }
    }
    })
});

//Specification for an author
const AuthorType = new GraphQLObjectType({
    name : "Author",
    description : "An Author That Has a Book",
    fields : () => ({
        id : {type : GraphQLNonNull(GraphQLInt)},
        name : {type : GraphQLNonNull(GraphQLString)},
        //Query all books written by the author
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                //Filter books to find one or more that have this author
              return books.filter(book => book.authorId === author.id)
            }
        }   
    })
});

//Make Queries
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
      },
      //Querying all authors returns a list of all the authors conforming to the author type
      authors: {
        type: new GraphQLList(AuthorType),
        description: 'List of all authors that can be queried',
        resolve: () => authors
      },
      //Querying individual books by a unique property, which is the id
      book : {
        type : BookType, 
        description : 'A Single book',
        args : {
            id : { type : GraphQLNonNull(GraphQLInt)}
        },
        resolve : (parent, args) => books.find(book => book.id  === args.id)
      },
      //Query individual author by a unique property, which is id
      author:{
          type : AuthorType, 
          description : 'A single author',
          args : {
              id : { type : GraphQLNonNull(GraphQLInt)},
          },
          resolve : (parent, args) => authors.find(author => author.id === args.id)   
      }
  })                                           
});

//Make Changes/Mutate Date(Similar to CRUD in REST)
const RootMutationType = new GraphQLObjectType({
   name : "Mutations",
   description : "Make changes to all your data",
   fields: () => ({
       //Add new book
      addBook : {
          type : BookType,
          description : "Add a new Book",
          args : {
              name : {type : GraphQLNonNull(GraphQLString)},
              authorId :{ type : GraphQLNonNull(GraphQLInt)}
          }, 
          resolve : (parent, args) =>{
              const addedBook = {
                  id: books.length + 1, 
                  name : args.name, 
                  authorId : args.authorId
              }
              books.push(addedBook);
              return addedBook
          } 
      } ,
      //Add New Author
      addAuthor : {
          type : AuthorType,
          description : "Add a new Author",
          args : {
              name : { type : GraphQLNonNull(GraphQLString)}
          },
          resolve : (parent, args) => {
              const newAuthor = {
                  id : authors.length + 1,
                  name :args.name,   
              }
              authors.push(newAuthor)
              return newAuthor
          }
      },
      //Delete Author
      deleteAuthor : {
          type : AuthorType,
          description: "Delete an author",
          args: {
              id : {type :GraphQLNonNull(GraphQLInt)}
          }, 
          resolve : (parent, args) => {
             return  authors.filter((author) => author.id === args.id)
          }
      }
    //   deleteBook : {
    //       type : BookType,
    //       description : "Delete a book",
    //       args : {
    //           id : {type: GraphQLNonNull(GraphQLInt)}
    //       },
    //       resolve :(parent, args) =>{
    //           return books.filter((book) => book.id === args.id )
    //         //   const newBooks = books.filter(() => {
    //         //       book => book.id === args.id
    //         //    })
    //         //   console.log("New Books", newBooks);
    //         //   return newBooks;
    //       }   
    //   },
   }) 
})

//Graphiql will render this schema which can be used to query or mutate data
const schema = new GraphQLSchema({
    //We can basically only query and mutate(change) data so those are the keys of our schema
    query: RootQueryType,
    mutation: RootMutationType
  });


//Use graphiql interface to query and mutate data following the schema above at /graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(5000, () => console.log('Server Running'));