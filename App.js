import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import {ApolloProvider} from '@apollo/client';
import Auth from './src/components/Auth';
import store from './src/store/store'
import {Provider} from 'react-redux';
import {gqlClient} from './src/graphql/client'


const App = () => {
  const [token, setToken] = useState()
  const client = gqlClient(token)

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SafeAreaProvider>
          <Auth setToken={setToken}>
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </Auth>
        </SafeAreaProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
