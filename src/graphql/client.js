import {ApolloClient, InMemoryCache} from '@apollo/client';
import {URI, CREDENTIALS} from '../constants/variables'

let client;



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
    else {
        return client ? client : client = new ApolloClient({
            uri: URI,
            cache: new InMemoryCache(),
            credentials: CREDENTIALS,
          }); 
    }
}

