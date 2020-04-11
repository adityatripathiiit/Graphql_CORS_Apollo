import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
const getBook = gql`
    {
        books{
            name
            id
        }
    }
`

export class booksList extends Component {

    showBooks(){
        var data = this.props.data;
        if(data.loading){
            return <div> Loading... </div>
        }
        return data.books.map((book,key = book.id) => {
            return(<li key={key}>{book.name}</li>)
        });
    }


    render() {
        return (
            <div>
                {this.showBooks()}
            </div>
        )
    }
}

export default graphql(getBook)(booksList);
