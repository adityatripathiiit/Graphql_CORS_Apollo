import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
const getAuthors = gql`
    {
        authors{
            name
            id
        }
    }
`

export default function addBook() {
    return (
        <div>
            
        </div>
    )
}
