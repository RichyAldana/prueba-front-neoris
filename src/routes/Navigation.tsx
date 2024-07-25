import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native";
import F1 from "../pages/F1";
import F2 from "../pages/F2"
import F3 from "../pages/F3"
import F4 from "../pages/F4"
import F5 from "../pages/F5"
import F6 from "../pages/F6"

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="F1"
            screenOptions={({ route }) => ({
                headerTintColor: 'black',
                headerStyle: { backgroundColor: 'white' },
            })}>
            <Stack.Screen name="F1" component={F1} />
            <Stack.Screen name="F2" component={F2} />
            <Stack.Screen name="F3" component={F3} />
            <Stack.Screen name="F4" component={F4} />
            <Stack.Screen name="F5" component={F5} />
            <Stack.Screen name="F6" component={F6} />
        </Stack.Navigator>
    )
}

export default Navigation