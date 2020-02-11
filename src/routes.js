import React from "react"
import {Image} from "react-native"
import logo from "./assets/instagram.png"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Feed from "./pages/Feed"
const Stack = createStackNavigator();

function LogoTitle() {
    return (
      <Image
        source={logo}
      />
    );
}

function Routes(){
    return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign:"center",
                headerStyle:{
                    backgroundColor:"#f5f5f5"
                }
            }}
        >
            <Stack.Screen 
                name="Feed" 
                component={Feed}
                options={{
                    headerTitle:<Image source={logo}/>
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
}
export default Routes;