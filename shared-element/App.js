import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';


import SalonList from './src/SalonList';
import SalonListDetail from './src/SalonListDetail';

const Stack = createSharedElementStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SalonList" component={SalonList} />
        <Stack.Screen name="SalonListDetail" component={SalonListDetail}
          sharedElements={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [
              `item.${item.id.value}.bg`,
              `item.${item.id.value}.name`,
              `item.${item.id.value}.image`
            ];
          }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
