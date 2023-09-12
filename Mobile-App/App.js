import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LayoutScreen from './src/Screens/LayoutScreen';

export default function App() {
  return (
    <SafeAreaView style={[
      styles.container,
      {
        flexDirection: 'column',
      },
    ]}>
      <LayoutScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 5,
  },
});
