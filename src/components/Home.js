import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function Home(props) {

    // recibir los parametros enviados 
    const { navigation } = props,
        idUser = navigation.getParam('uid'),
        emailUser = navigation.getParam('email')

    // controlar el cierre de sesión
    const handleLogout = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textContent}>**********Bienvenido*********</Text>
            <Text style={styles.textContent}>ID USER: {idUser}</Text>
            <Text style={styles.textContent}>EMAIL USER: {emailUser}</Text>
            <TouchableOpacity style={styles.contentTouchable} onPress={() => handleLogout()}>
                <Text style={styles.textTouchable}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContent: {
        fontWeight: '700',
        fontSize: 15
    },
    contentTouchable: {
        backgroundColor: '#dc3545',
        borderRadius: 10,
        marginVertical: 20,
        width: '50%',
        height: 30
    },
    textTouchable: {
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
})