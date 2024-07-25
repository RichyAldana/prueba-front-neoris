import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import api from "../../services/api";

const F4 = ({ route, navigation }) => {
    const { data } = route.params;
    const [inputId, setInputId] = useState(data.id);
    const [inputName, setInputName] = useState(data.name);
    const [inputDescription, setInputDescription] = useState(data.description);
    const [inputLogo, setInputLogo] = useState(data.logo);
    const [inputL, setInputL] = useState(data.date_release);
    const [inputR, setInputR] = useState(data.date_revision);

    const [inputErrorID, setInputErrorID] = useState('');
    const [inputErrorName, setInputErrorName] = useState('');
    const [inputErrorDescription, setInputErrorDescription] = useState('');
    const [inputErrorLogo, setInputErrorLogo] = useState('');
    const [inputErrorL, setInputErrorL] = useState('');
    const [inputErrorR, setInputErrorR] = useState('');

    const [dataa, setDataa] = useState<any>(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const validateInputLengthId = (text: string) => {
        return text.length >= 3 && text.length <= 10;
    };
    const validateInputLengthName = (text: string) => {
        return text.length >= 5 && text.length <= 100;
    };
    const validateInputLengthDescription = (text: string) => {
        return text.length >= 10 && text.length <= 200;
    };
    const validateInputLengthLogo = (text: string) => {
        return text.length > 0;
    };
    const validateInputLengthL = (text: string) => {
        return text.length > 0;
    };
    const validateInputLengthR = (text: string) => {
        return text.length > 0;
    };
    const handleInputId = (text: string) => {
        setInputId(text);
        if (!validateInputLengthId(text)) {
            setInputErrorID('Debe ingresar entre 3 y 10 caracteres');
        } else {
            setInputErrorID('');
        }
    };
    const handleInputName = (text: string) => {
        setInputName(text);
        if (!validateInputLengthName(text)) {
            setInputErrorName('Debe ingresar entre 5 y 100 caracteres');
        } else {
            setInputErrorName('');
        }
    };
    const handleInputDescription = (text: string) => {
        setInputDescription(text);
        if (!validateInputLengthDescription(text)) {
            setInputErrorDescription('Debe ingresar entre 10 y 200 caracteres');
        } else {
            setInputErrorDescription('');
        }
    };
    const handleInputLogo = (text: string) => {
        setInputLogo(text);
        if (!validateInputLengthLogo(text)) {
            setInputErrorLogo('Debe ingresar entre 3 y 100 caracteres');
        } else {
            setInputErrorLogo('');
        }
    };
    const handleInputL = (text: string) => {
        setInputL(text);
        if (!validateInputLengthL(text)) {
            setInputErrorL('Debe ingresar una fecha');
        } else {
            setInputErrorL('');
        }
    };
    const handleInputR = (text: string) => {
        setInputR(text);
        if (!validateInputLengthR(text)) {
            setInputErrorR('La fecha debe ser mayor a un año');
        } else {
            setInputErrorR('');
        }
    };

    const handleSubmit = async () => {
        if (validateInputLengthId(inputId) && validateInputLengthName(inputName) && validateInputLengthDescription(inputDescription)) {
            // Submit form or perform further actions
            const userData = {
                id: inputId,
                name: inputName,
                description: inputDescription,
                logo: inputLogo,
                date_release: inputL,
                date_revision: inputR
            }
            try {
                const response = await api.post('/bp/products',
                    userData,
                    {
                        headers: {
                            authorId: "007"
                        }
                    }
                );
                // setData(response.data);
            } catch (err) {

            }
            alert('Form submitted successfully!');
        } else {
            setInputErrorL('Ingrese todo lo requerido');
        }
    };
    return (
        <View>
            <Text style={styles.title}>Editar</Text>
            <View style={styles.content}>
                <Text>ID</Text>
                <TextInput
                    style={styles.input}
                    value={inputId}
                    onChangeText={handleInputId}
                    autoCapitalize="none"
                    editable={false}></TextInput>
                {inputErrorID ? <Text style={styles.error}>{inputErrorID}</Text> : null}
            </View>
            <View style={styles.content}>
                <Text>Nombre</Text>
                <TextInput style={styles.input}
                    value={inputName}
                    onChangeText={handleInputName}
                    autoCapitalize="none"></TextInput>
                {inputErrorName ? <Text style={styles.error}>{inputErrorName}</Text> : null}
            </View>
            <View style={styles.content}>
                <Text>Descripción</Text>
                <TextInput style={styles.input}
                    value={inputDescription}
                    onChangeText={handleInputDescription}
                    autoCapitalize="none"></TextInput>
                {inputErrorDescription ? <Text style={styles.error}>{inputErrorDescription}</Text> : null}
            </View>
            <View style={styles.content}>
                <Text>Logo</Text>
                <TextInput style={styles.input}
                    value={inputLogo}
                    onChangeText={handleInputLogo}
                    autoCapitalize="none"></TextInput>
                {inputErrorL ? <Text style={styles.error}>{inputErrorL}</Text> : null}
            </View>
            <View style={styles.content}>
                <Text>Fecha Liberación</Text>
                <TextInput style={styles.input}
                    value={inputL}
                    placeholder="2024-03-01"
                    onChangeText={handleInputL}
                    autoCapitalize="none"></TextInput>
                {inputErrorR ? <Text style={styles.error}>{inputErrorR}</Text> : null}
            </View>
            <View style={styles.content}>
                <Text>Fecha Revisión</Text>
                <TextInput style={styles.input}
                    value={inputR}
                    placeholder="2024-03-01"
                    onChangeText={handleInputR}
                    autoCapitalize="none"></TextInput>
            </View>
            <View style={styles.contentButton}>
                <Button title="Actualizar" color='#FEDF00'
                    onPress={handleSubmit} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        paddingLeft: 25,
        paddingVertical: 10
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10
    },
    contentButton: {
        gap: 10,
        paddingHorizontal: 20
    },
    content: {
        margin: 20
    },
    error: {
        color: 'red',
    },
})

export default F4