import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import ListItem from './ListItem';


const List = (props) => {
    // console.log(props.listItems);
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={props.listItems}
                renderItem={({ item }) => <ListItem item={item.item} itemId={item.itemId} deleteItem={props.deleteItem} />}
            />
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderWidth: 2,
        height: '100%',
        width: '100%',
    },

    buttons: {
        display: 'flex',
        flexDirection: 'column',

    },
    list: {
        width: '100%',
    },
    btn: {
        display: 'flex',
        backgroundColor: '#00d1dd',
        height: 50,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 50,

    },
    btnTxt: {
        color: '#111111',
        fontSize: 16,
        fontWeight: 'bold'
    },
    resTxt: {
        color: '#111111',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        textAlign: 'center'
    },

})