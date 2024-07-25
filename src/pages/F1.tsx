import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable, Image, Button, TextInput } from "react-native";
import api from '../../services/api';
import arrow from '../img/arrow.png'
import axios from "axios";

const F1 = ({ navigation }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any | null>(null);


    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            return;
        }
        const result = data.find(item => item.id.toString() === query);
        if (result) {
            setFilteredData(result);
            setError(null);
        } else {
            setFilteredData(null);
            setError('No data found for the given ID');
        }
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get('/bp/products', {
                    headers: {
                        authorId: "007"
                    }
                });
                setData(response.data);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, []);

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Buscar..."
                value={query}
                onChangeText={setQuery}></TextInput>
            {filteredData && (
                <CardBody navigation={navigation} data={filteredData} />

            )}
            {data ?
                <SafeAreaView style={{ height: 500 }}>
                    <FlatList
                        data={filteredData !== null ? filteredData : data}
                        renderItem={({ item }) => <CardBody navigation={navigation} data={item} />}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView> : <Text>Cargando ...</Text>
            }
            <View style={styles.viewButton}>
                <Button title="Agregar" color='#FEDF00'
                    onPress={() => navigation.navigate('F3')}
                />
            </View>
        </View>
    )
}

const CardBody = ({ navigation, data }) => {
    return (
        <Pressable style={styles.content}
            onPress={() => navigation.navigate('F2', { data: data })}>
            <View>
                <Text>Nombre: {data.name}</Text>
                <Text>ID: {data.id}</Text>
            </View>
            <Image source={arrow} style={styles.img}></Image>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        marginHorizontal: 30,
        padding: 10,
        marginTop: 5,
    },
    img: {
        width: 50,
        height: 50
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        margin: 25
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewButton: {
        padding: 20
    }
})

export default F1