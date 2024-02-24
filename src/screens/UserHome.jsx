import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase_config';
import { collection, getDocs, doc, addDoc, deleteDoc } from "firebase/firestore";
import List from '../components/List';

const UserHome = () => {
    const [textForResponse, setTextForResponse] = useState('Thanks for asking!  Here are some things I have on my list: ')
    const [textResponse, setTextResponse] = useState('');
    const [listItems, setListItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editResponseBox, setEditResponseBox] = useState(false);
    const [showFullResponse, setShowFullResponse] = useState(false);
    const [newItem, setNewItem] = useState('');

    const getItems = async () => {
        setLoading(true);
        try {
            const allItems = []
            const res = await getDocs(collection(db, "items"))
            res.forEach((doc) => {
                let itemObj = {
                    itemId: doc.id,
                    item: doc.data().item
                }
                allItems.push(itemObj);
            })

            setListItems(allItems);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }


    const saveItem = async () => {
        if (!newItem) {
            console.log("BLANK");
            return;
        }

        try {
            const res = await addDoc(collection(db, "items"), {
                item: newItem,
            });
            console.log("Document written with ID: ", res.id);
            console.log(res);
            getItems();
        } catch (error) {
            console.log(error);
        } finally {
            setNewItem('');
            setModalVisible(!modalVisible)
        }
    }

    const deleteItem = async (props) => {
        console.log("AICARRUMMBA PROPS!  : ", props);
        try {
            const res = await deleteDoc(doc(db, "items", props));
            console.log("Removed Item: ", res);
        } catch (error) {
            console.log(error);
        } finally {
            getItems();
        }
    }

    const createText = () => {
        let txtRes = textForResponse;
        listItems.map((item, index) => {
            if (index === 0) {
                txtRes = txtRes + " " + item.item
            } else if (index === listItems.length - 1) {
                txtRes = txtRes + ", and " + item.item
            } else {
                txtRes = txtRes + ", " + item.item
            }
        })
        setTextResponse(txtRes);
        setShowFullResponse(true);
    }

    useEffect(() => {
        getItems();
    }, [])

    return (
        <View style={styles.container}>
            {/* ADD ITEM MODAL */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>New Item</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setNewItem(val)}
                            value={newItem}
                            placeholder='Add New Item...'
                        />
                        <View style={styles.modBtns}>
                            <TouchableOpacity
                                style={styles.modBtn}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.btnTxt}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modBtn}
                                onPress={saveItem}>
                                <Text style={styles.btnTxt}>SAVE ITEM</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            {/* EDIT RESPONSE MODAL */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={editResponseBox}
                onRequestClose={() => {
                    setEditResponseBox(!editResponseBox);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Text Response</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setTextForResponse(val)}
                            value={textForResponse}
                        />
                        <View style={styles.modBtns}>
                            <TouchableOpacity
                                style={styles.modBtn}
                                onPress={() => setEditResponseBox(false)}>
                                <Text style={styles.btnTxt}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modBtn}
                                onPress={() => setEditResponseBox(false)}>
                                <Text style={styles.btnTxt}>SAVE RESPONSE</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            {/* SHOW FULL RESPONSE MODAL */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showFullResponse}
                onRequestClose={() => {
                    setShowFullResponse(!showFullResponse);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Text Response</Text>
                        <Text style={styles.title}>{textResponse}</Text>
                        <TouchableOpacity
                            style={styles.modBtn}
                            onPress={() => setShowFullResponse(false)}>
                            <Text style={styles.btnTxt}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <View style={styles.responseSection}>
                <Text style={styles.title}>Current Response</Text>
                <Text style={styles.resTxt}>{textForResponse}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => setEditResponseBox(true)} >
                    <Text style={styles.btnTxt}>EDIT RESPONSE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => createText()} >
                    <Text style={styles.btnTxt}>VIEW FULL TEXT</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.listSection}>
                <Text style={styles.title}>My List:</Text>
                {
                    loading ?
                        <Text>Loading...</Text>
                        :
                        <List listItems={listItems} deleteItem={deleteItem} />
                }
                {
                    modalVisible ?
                        <>
                        </>
                        :
                        <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
                            <Text style={styles.btnTxt}>ADD ITEM</Text>
                        </TouchableOpacity>
                }

            </View>
        </View>
    )
}

export default UserHome

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
        color: '#ffffff',
        marginVertical: 20,
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
    modBtns: {
        display: 'flex',
        flexDirection: 'row',
    },
    btn: {
        display: 'flex',
        backgroundColor: '#00d1dd',
        height: 50,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginVertical: 20,
    },
    modBtn: {
        display: 'flex',
        backgroundColor: '#00d1dd',
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    btnTxt: {
        color: '#eeeeee',
        fontSize: 16,
        fontWeight: 'bold'
    },
    resTxt: {
        color: '#111111',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    responseSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'blue',
        paddingHorizontal: 20,
    },
    listSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'red'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        borderColor: '#eeeeee',
        borderRadius: 10,
        padding: 5,
        width: '80%',
        height: '30%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        width: '90%',
        borderColor: '#eeeeee',
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,.9)',
        paddingHorizontal: 10,
    }

})