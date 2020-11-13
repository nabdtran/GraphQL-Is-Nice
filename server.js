const express = require('express');

const { graphqlHTTP } = require('express-graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

app.listen(5000, () => console.log('Server Running'))