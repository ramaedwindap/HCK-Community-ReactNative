import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LayoutScreen from '../Screens/LayoutScreen';
import HomeScreen from '../Screens/HomeScreen';
import PostScreen from '../Screens/PostScreen';

export default function MainStack() {
    const Stack = createNativeStackNavigator();

    return (
        <LayoutScreen>
            <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                    name="Home"
                    component={HomeScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                    name="Detail"
                    component={PostScreen} />
            </Stack.Navigator>
        </LayoutScreen>

    )
}
