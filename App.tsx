import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import UserHome from './src/screens/UserHome';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="UserHome" component={UserHome} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
