import {ApolloProvider} from '@apollo/client';
import React from 'react';
import renderer from 'react-test-renderer';
import Statistics from './statistics';
import {client} from '../../../apollo/wrapper'

const component = renderer.create(
  <ApolloProvider client = {client} >
    <Statistics route = {{ params: { groupname: 'Dream Team'} }}/>
  </ApolloProvider>,
);

