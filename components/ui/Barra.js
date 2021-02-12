import React from 'react';
import { Button } from 'react-native-paper';

export const Barra = ({ navigation, route }) => {

    const handlePress = () => {
        navigation.navigate('NuevoCliente');
    }

    return (
        <Button
            name="btn"
            icon="approximately-equal"
            color='white'
            onPress={() => handlePress()}
        >
            Cliente
        </Button>
    )
}

