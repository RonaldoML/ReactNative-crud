import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { TextInput, Headline, Button, HelperText } from 'react-native-paper';
import { globalStyles } from '../styles/global';

export const NuevoCliente = ({navigation, route}) => {

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [empresa, setEmpresa] = useState('');

    const [atExists, setAtExists] = useState(false);

    const { setConsultarApi } = route.params;

    useEffect(() => {
        if(route.params.cliente){
            const cliente = route.params.cliente;
            setNombre(cliente.nombre);
            setTelefono(cliente.telefono);
            setCorreo(cliente.correo);
            setEmpresa(cliente.empresa);
        }
    }, [])

    const handleSave = async () => {
        //validar
        if (nombre === '' || correo === '' || telefono === '' || empresa === '') {
            return Alert.alert(
                'Error...',
                'Todos los campos son obligatorios',
                [{ text: 'OK' }],
                { cancelable: true }
            );
        }if(!correo.includes('@')){
            setAtExists(true);
            return; 
        }
        setAtExists(false);
        //generar cliente
        const cliente = { nombre, telefono, correo, empresa };

        //Validar si creamos o editamos un cliente
        if(route.params.cliente){
            const { id } = route.params.cliente;
            cliente.id = id;
            //editar cliente en la API
            try {
                if (Platform.OS === 'android') {
                    //para android
                    await axios.put(`http://10.0.2.2:3000/clientes/${id}`, cliente);
    
                } else {
    
                    //para ios
                    await axios.put(`http://localhost:3000/clientes${id}`, cliente);
                }
                
            } catch (error) {
                return Alert.alert(
                    'Error...',
                    error,
                    [{ text: 'OK' }],
                    { cancelable: true }
                );
            }
        }else{

            //guardar cliente en la API
            try {
                if (Platform.OS === 'android') {
                    //para android
                    await axios.post('http://10.0.2.2:3000/clientes', cliente);
    
                } else {
    
                    //para ios
                    await axios.post('http://localhost:3000/clientes', cliente);
                }
                
            } catch (error) {
                return Alert.alert(
                    'Error...',
                    error,
                    [{ text: 'OK' }],
                    { cancelable: true }
                );
            }
        }
        //redireccionar
        navigation.navigate('Inicio');
        //limpiar el form
        setCorreo('');
        setNombre('');
        setEmpresa('');
        setTelefono('');
        setConsultarApi(true);
    }

    return (
        <View style={globalStyles.container}>
            <Headline style={globalStyles.titulo}>Guardar cliente</Headline>
            <TextInput
                autoCapitalize='words'
                style={styles.input}
                label='Nombre'
                placeholder="Ronaldo"
                value={nombre}
                onChangeText={nombre => setNombre(nombre)}
            />
            <TextInput
                style={styles.input}
                label='Teléfono'
                placeholder="23452345245"
                keyboardType='numeric'
                value={telefono}
                onChangeText={(tel) => setTelefono(tel)}
            />
            <TextInput
                style={{ backgroundColor: 'transparent' }}
                label='Correo'
                placeholder="correo@correo.com"
                keyboardType='email-address'
                value={correo}
                onChangeText={(correo) => setCorreo(correo)}
            />
            <HelperText type="error" visible={atExists}>
                Email address is invalid!
            </HelperText>
            <TextInput
                style={styles.input}
                label='Empresa'
                placeholder="Empresa"
                value={empresa}
                onChangeText={(empresa) => setEmpresa(empresa)}
            />
            <Button
                icon='pencil-circle'
                mode='contained'
                onPress={() => handleSave()}

            >
                Guardar
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

