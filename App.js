import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import AddToList from './Screens/AddToList';
import EditToList from './Screens/EditToList';
import DeleteToList from './Screens/DeleteToList';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='AddToList' component={AddToList} options={{headerShown:false}}/>
        <Stack.Screen name='EditToList' component={EditToList} options={{headerShown:false}}/>
        <Stack.Screen name='DeleteToList' component={DeleteToList} options={{headerShown:false}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
