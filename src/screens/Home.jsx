import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import logo from '../assets/logo1.png';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("UserHome")}>
                    <Text style={styles.btnTxt}>LOGIN</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnTxt}>SIGNUP</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#111111',
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#ffffff'
    },
    logo: {
        height: 300,
        width: '100%',
        objectFit: 'contain'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',

    },
    btn: {
        display: 'flex',
        backgroundColor: '#00d1dd',
        height: 60,
        width: 145,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 50,
    },
    btnTxt: {
        color: '#111111',
        fontSize: 20,
        fontWeight: 'bold'
    }

})