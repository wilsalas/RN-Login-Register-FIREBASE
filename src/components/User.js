import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import ConfigFirebase from '../config';

export default class FormUser extends PureComponent {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            loading: false
        }

    }

    // comprueba el estado del contenedor de cargando
    isLoading = loading => this.setState({ loading })

    // controla el evento a seleccionar si es para login o registro
    handleForm = async type => {
        if (this.state.username === "" && this.state.password === "")
            return Alert.alert("Los campos no pueden estar vacíos.");
        this.isLoading(true);
        switch (type) {
            case 'login':
                this.loginFromFirebase()
                break;
            case 'register':
                this.createNewUserFromFirebase();
                break;
            default:
                break;
        }

    }

    // enviar los datos de usuario a firebase para crear un nuevo registro
    createNewUserFromFirebase = async () => {
        try {
            let newUser = await ConfigFirebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password);
            if (newUser) Alert.alert("Registro de usuario exitoso!");
        } catch (error) {
            Alert.alert(error.message);
            console.warn(JSON.stringify(error));
        }
        this.isLoading(false);
    }


    // enviar los datos de usuario a firebase para iniciar sesión
    loginFromFirebase = async () => {
        try {
            let isLogin = await ConfigFirebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password);
            /* si el inicio se sesión es valido, se redirecciona al home
            enviando como parametro los datos del usuario*/
            if (isLogin) {
                this.props.navigation.navigate("home", {
                    uid: isLogin.user.uid,
                    email: isLogin.user.email
                });
            }
        } catch (error) {
            Alert.alert(error.message);
            console.warn(JSON.stringify(error));
        }
        this.isLoading(false);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    {this.state.loading ?
                        <View style={styles.contentLoading}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                        :
                        <View>
                            <Text style={[styles.textCenter, { paddingTop: 20 }]}>Usuarios</Text>
                            <TextInput
                                style={styles.inputForm}
                                placeholder="Correo electrónico"
                                keyboardType={'email-address'}
                                selectionColor={'#28a745'}
                                placeholderTextColor={'black'}
                                underlineColorAndroid={'#28a745'}
                                defaultValue={this.state.username}
                                onChangeText={username => this.setState({ username })}
                            />
                            <TextInput
                                style={styles.inputForm}
                                placeholder="Contraseña"
                                secureTextEntry
                                selectionColor={'#28a745'}
                                placeholderTextColor={'black'}
                                underlineColorAndroid={'#28a745'}
                                defaultValue={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                            <TouchableOpacity onPress={() => this.handleForm('login')} style={styles.submitTouchable}>
                                <Text style={[styles.textCenter, { color: 'white' }]}>Iniciar Sesión</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.handleForm('register')}>
                                <Text style={[styles.textCenter, { color: 'blue' }]}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        borderRadius: 10,
        borderWidth: .5,
        borderColor: '#6c757d',
        marginVertical: 10,
        width: '70%',
        height: '55%',
    },
    inputForm: {
        marginHorizontal: 30,
        height: '20%'
    },
    textCenter: {
        textAlign: 'center',
        fontSize: 25,
    },
    submitTouchable: {
        backgroundColor: '#28a745',
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 20
    }
});
