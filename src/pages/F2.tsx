import React, { useState } from "react";
import { Text, View, Image, Button, StyleSheet, Pressable } from "react-native";
import Modal from 'react-native-modal';
import api from "../../services/api";

const F2 = ({ route, navigation }) => {
    const { data } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const deleate = async () => {
        try {
            const response = await api.delete(`/bp/products`, {
                params: { id: data.id },
                headers: {
                    authorId: "007"
                }
            },
            );
            const dataE = true
            navigation.navigate('F1')
        } catch (err) {

        }
    }
    return (
        <View style={style.content}>
            {response && <Text>{response}</Text>}
            <View style={style.contentId}>
                <Text style={style.textId}>ID: {data.id}</Text>
                <Text>Información Extra</Text>
            </View>
            <View style={style.contentBody}>
                <View style={style.contentDirection}>
                    <Text>Nombre</Text>
                    <Text>{data.name}</Text>
                </View>
                <View style={style.contentDirection}>
                    <Text>Descripcion</Text>
                    <Text>{data.description}</Text>
                </View>
                <View style={style.contentDirection}>
                    <Text>Logo</Text>
                    <Image source={{ uri: data.logo }} style={style.img} />
                </View>
                <View style={style.contentDirection}>
                    <Text>Fecha de Liberación</Text>
                    <Text>{data.date_release}</Text>
                </View>
                <View style={style.contentDirection}>
                    <Text>Fecha de revisión</Text>
                    <Text>{data.date_revision}</Text>
                </View>
            </View>
            <View style={style.contentButton}>
                <Button title="Editar" color='#d3d3d3'
                    onPress={() => navigation.navigate('F4', { data: data })} />
                <Button title="Eliminar" color='#FF0000'
                    onPress={toggleModal} />
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={style.modal}
            >
                <View style={style.modalContent}>
                    <Text style={style.textModal}>¿Estás seguro que deseas eliminar el producto?</Text>
                    <View style={style.contentButton}>
                        <Pressable style={style.modalButtonEliminarYellow}
                            onPress={deleate}>
                            <Text style={style.colorText}>Confirma</Text>
                        </Pressable>
                        <Pressable style={style.modalButtonCancelar}
                            onPress={toggleModal}>
                            <Text style={style.colorText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const style = StyleSheet.create({
    textId: {
        fontSize: 30,
        fontWeight: "bold"
    },
    contentId: {
        padding: 30
    },
    content: {
        height: 700,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    contentBody: {
        gap: 20
    }, contentButton: {
        gap: 10,
        paddingHorizontal: 20
    },
    contentDirection: {
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    img: {
        width: 200,
        height: 100
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    textModal: {
        fontSize: 20,
        padding: 10,
        paddingVertical: 30,
        textAlign: "center"
    },
    modalButtonEliminarYellow: {
        paddingHorizontal: 100,
        paddingVertical: 10,
        backgroundColor: '#FEDF00',
        marginVertical: 10,
        borderRadius: 5
    },
    modalButtonCancelar: {
        paddingHorizontal: 100,
        paddingVertical: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5
    },
    colorText: {
        color: "blue"
    }
})


export default F2