import {ApolloClient, InMemoryCache} from '@apollo/client';
import {URI, CREDENTIALS} from '../constants/variables'

let client;


export const gqlClient = (token) => {
  console.log('2nd', token)

  console.log('client',client)
  
    if(client?.link?.options.headers){
      return client
    }

    console.log('the headers specificly', client?.link?.options.headers)

    if(!!token){
      console.log('token from the gql', token)
        return client = new ApolloClient({
            uri: URI,
            cache: new InMemoryCache(),
            credentials: CREDENTIALS,
            headers: {
              authorization: token ? `Bearer ${token}` : '',
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

