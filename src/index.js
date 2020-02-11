import React from 'react';
import { StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import Routes from "./routes"


const App: () => React$Node = () => {
    return (
      <>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content"/>
      <Routes/>
      </>
      // <View><Text>Olá, mundo!</Text></View>
    )
}
export default App;