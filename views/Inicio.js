import React, { useEffect, useState } from 'react';
import { Alert, Text, View, FlatList } from 'react-native';
import { Headline, List, FAB } from 'react-native-paper';
import axios from 'axios';
import { globalStyles } from '../styles/global';


export const Inicio = ({navigation}) => {

  const [clientes, setClientes] = useState([]);
  const [consultarApi, setConsultarApi] = useState(true);

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const resultado = await axios.get('http://10.0.2.2:3000/clientes');
        setClientes(resultado.data);
        setConsultarApi(false);
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al cargar los datos', [{ text: 'OK' }], { cancelable: true });
      }
    }
    if(consultarApi){

      obtenerClientesApi();
    }

  }, [consultarApi])

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.titulo}> {clientes.length !== 0 ? 'Clientes' : 'Aún no hay clientes!!'} </Headline>
      <FlatList
        data={clientes}
        keyExtractor={ cliente => (cliente.id).toString() }
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={()=> navigation.navigate('DetalleCliente',{item,setConsultarApi})}
          />
        )}
      />
      <FAB 
        icon='plus'
        style={globalStyles.fab}
        onPress={ () => navigation.navigate('NuevoCliente',{setConsultarApi}) }
      />
    </View>
  )
}

