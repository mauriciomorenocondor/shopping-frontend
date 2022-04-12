import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import 'emerald-ui/lib/styles.css';
import 'emerald-ui/lib/styles-ceb.css';
import './assets/index.scss';
import App from './App';

const client = new ApolloClient({
    uri: "http://44.201.129.107:8080/api/v1/graphql",
    //uri: "http://localhost:8080/api/v1/graphql",
    cache: new InMemoryCache()
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ApolloProvider client={client}>
        <App tab="home" />
    </ApolloProvider>
);
