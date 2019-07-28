import React from 'react';
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import FormUser from '../components/User';
import Home from '../components/Home';

/* Definir los componentes generales del app */
const AppNavigator = createStackNavigator(
    {
        index: {
            screen: FormUser
        },
        home: {
            screen: Home
        }
    }, {
        initialRouteName: 'index',
        headerMode: 'none'
    }
)

/* configurar el stack de navegación */
const AppContainer = createAppContainer(AppNavigator);

export default () => <AppContainer />