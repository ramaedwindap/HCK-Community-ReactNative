import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigator/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
