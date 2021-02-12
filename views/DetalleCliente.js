import React from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { Headline, Subheading, Text, Button, FAB } from 'react-native-paper';
import axios from 'axios';

import { globalStyles } from '../styles/global';

export const DetalleCliente = ({ navigation, route }) => {

    const { nombre, telefono, correo, empresa, id } = route.params.item;
    const { setConsultarApi } = route.params;

    const handleConfirm = () => {
        Alert.alert(
            'Deseas elimnar el cliente?',
            'Una vez eliminado no se puede recuperar',
            [
                { text: 'Sí, eliminar!', onPress: () => DeleteContact() },
                { text: 'Cancelar' }
            ],
            { cancelable: true }
        )
    }

    const DeleteContact = async () => {
        try {
            if (Platform.OS === 'android') {
                //para android
                await axios.delete(`http://10.0.2.2:3000/clientes/${id}`);

            } else {

                //para ios
                await axios.delete(`http://localhost:3000/clientes/${id}`);
            }
        } catch (error) {
            Alert.alert(
                'Oops!',
                error,
                [
                    { text: 'OK' }
                ],
                { cancelable: true }
            )
        }
        //redireccionar
        navigation.navigate('Inicio');

        //volver a consultar la api
        setConsultarApi(true);
    }

    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>

            <Button
                mode="contained"
                icon='cancel'
                style={styles.btnEliminar}
                onPress={() => { handleConfirm() }}
            >
                Eliminar
            </Button>

            <FAB
                icon='pencil'
                style={globalStyles.fab}
                onPress={() => navigation.navigate('NuevoCliente', { cliente: route.params.item, setConsultarApi })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    btnEliminar: {
        backgroundColor: 'red'
    }
})
