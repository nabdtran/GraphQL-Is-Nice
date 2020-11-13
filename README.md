# Hey!

#### Here is a very brief introduction to Graphql.  After watching this [video]() by Web Dev Simplified, I decided to make a repository documenting evey step of the way to make it easy as possible to follow through. 

## Steps to Run the App
1. Fork this repository. There is a large fork button at the top right. Just click on it. It's that simple.
 
3. Clone the forked repository to your computer by running this command, 
   ``` git clone https://github.com/YOURUSERNAME/GraphQL-Is-Nice ```
   
4. Open the respository in your favorite code editor. Mine is Visual Studio by the way.
   
5. Assuming you have node installed, run ```npm install``` to install all the development dependencies
   
6. Run the command ```npm run devStart``` to start up your server on port 5000

## Getting Started With the Code
 <b>Run git log to see the log of all the commits</b>
 
 Here are the commit messages , (in order of most recent)
 - Added graphiql interface image
  
 - DRYING
  
 - Mutation for adding a new author
  
 - Mutation for adding a new book

 - Query individual author by id and return whatever of its field you need
  
 - Query individual book by id and return whatever of its field you need
  
 - Flesh out author specification to include query for list of books by that author
  
 - Flesh out book specification to include query for the author of that book
  
 - Initial specification for author type
  
 - Query all authors conforming to the author type specification
  
 - Create inital specification for a booktype.
  
 - Query all books conforming to the book type specification
  
 - Sample query with fields message and id 
   
 - Create graphql schema for query and mutation to be interfaced with graphiql
  
 - Add dummy authors and books array
  
 - Require graphql and express-graphql packages for querying the Graphql way 
  
- Simple express server set up   :     a6eeb781726fc635e4a061bdbe3ff47446950303(Commit ID) 

To start from the very beginning, run this command 
``` git checkout a6eeb781726fc635e4a061bdbe3ff47446950303```
As you can see this long string of characters is the unique id generated for every commit message. Running the above command takes you back to the very beginning of the code. Once you understand the given version, run the aboe command again, this time with the next commit ID.

I ensured that the code in each version is minimal to promote understanding. I also added a lot of comments just to improve understanding.
![commits](https://github.com/KarenEfereyan/GraphQL-Is-Nice/blob/master/commits.png)

Cc : If you found this repository helpful give me a shoutout on [twitter](https://twitter.com/EfereyanK)
Don't forget also to star the repo!! Many thanks
  
Here is how graphiql looks
![graphiql](https://github.com/KarenEfereyan/GraphQL-Is-Nice/blob/master/img.png) !
