/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { DynamicStyleSheet, DynamicValue, useDarkMode, useDynamicValue } from 'react-native-dynamic';

import { Inicio } from './views/Inicio';
import { DetalleCliente } from './views/DetalleCliente';
import { NuevoCliente } from './views/NuevoCliente';
import { Barra } from './components/ui/Barra';

const Stack = createStackNavigator();

//Definir tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2'
  }

}

const App = () => {

  const styles = useDynamicValue(dynamicStyles);
  const isDM = useDarkMode();

  return (
    <>
      <PaperProvider>

        <NavigationContainer>
          <Stack.Navigator

            initialRouteName='Inicio'
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen
              name='Inicio'
              component={Inicio}
              options={({ navigation, route }) => ({
                headerTitleAlign: 'center',
                // headerLeft: (props) => (
                //   <Barra {...props}
                //     navigation={navigation}
                //     route={route}
                //   />
                // )
              })
              }
            />
            <Stack.Screen
              name='DetalleCliente'
              component={DetalleCliente}
              options={{
                title: 'Detalle Cliente'
              }}
            />
            <Stack.Screen
              name='NuevoCliente'
              component={NuevoCliente}
              options={{
                title: 'Nuevo Cliente'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  clima: {
    padding: 20,
  },
  pckrView: {
    borderBottomColor: new DynamicValue('black', 'white'),
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },

});

export default App;
