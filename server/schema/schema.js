const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../db/books_model');
const Author = require('../db/authors_model');


const { GraphQLObjectType, GraphQLString, 
    GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull
} = graphql;

// var books = [
//     {name:"Book1", genre: "Fiction", id:'1', authorId:'1'},
//     {name:"Book2", genre: "ghanta", id:'2',authorId:'1'},
//     {name:"Book3", genre: "Fiction", id:'3',authorId:'1'}
// ]
// var authors = [
//     {name:"Aditya", age: 20, id:'1'},
//     {name:"Tripathi", age: 21, id:'2'},
//     {name:"ghanta", age: 22, id:'3'}
// ]


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre : {type: GraphQLString},
        author : {
            type: AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorId);
                // return _.find(authors,{id: parent.authorId});
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age : {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorId: parent.id});
                // return _. filter(books, {authorId:parent.id})
            }
        }
    })
});




const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
         book:{
             type: BookType,
             args: {id: {type: GraphQLID}},
             resolve(parent,args) {
                return Book.findById(args.id);
            //    return _.find(books,{id: args.id});
             }
         },
         author: {
             type: AuthorType,
             args: {id: {type: GraphQLID}},
             resolve(parent,args) {
                return Author.findById(args.id);
                // return _.find(authors,{id: args.id});
             }
            },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                return Book.find({});
            }
            
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args) {
                return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull( GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args) {
                let author = new Author({
                    name: args.name,
                    age : args.age
                });
                return author.save();
            }
        
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull( GraphQLString)},
                genre : {type:new GraphQLNonNull( GraphQLString)},
                authorId: {type: new GraphQLNonNull( GraphQLID)}
            },
            resolve(parent,args) {
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });
               
                return book.save() ;
            },

        }
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}) 