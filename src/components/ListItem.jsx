import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.title}>{props.item}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.xBtn} onPress={() => props.deleteItem(props.itemId)}>
                    <Text style={styles.title}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'yellow',
        height: 50,
        width: '100%',
        marginVertical: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        paddingHorizontal: 5,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    xBtn: {
        display: 'flex',
        backgroundColor: '#dd0000',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginRight: 5,
    },
    btnTxt: {
        color: '#111111',
        fontSize: 16,
        fontWeight: 'bold'
    },

})