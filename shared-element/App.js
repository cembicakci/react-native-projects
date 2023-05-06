import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SalonList from './src/SalonList';
import SalonListDetail from './src/SalonListDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SalonList" component={SalonList} />
        <Stack.Screen name="SalonListDetail" component={SalonListDetail} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
