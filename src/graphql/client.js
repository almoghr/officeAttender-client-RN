import {ApolloClient, InMemoryCache} from '@apollo/client';

let client;


import {URI, CREDENTIALS} from '../constants/variables'

export const gqlClient = (token) => {


    if(!!token){
        return client = new ApolloClient({
            uri: URI,
            cache: new InMemoryCache(),
            credentials: CREDENTIALS,
            headers: {
              authorization: token ? `JWT ${token}` : '',
            },
          }); 
    }
    else if(!client && !token){
        return client = new ApolloClient({
            uri: URI,
            cache: new InMemoryCache(),
            credentials: CREDENTIALS,
          }); 
    }
    
    else if(client && !token){
        return client
    };

}

