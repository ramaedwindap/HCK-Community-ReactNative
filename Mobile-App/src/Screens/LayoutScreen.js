import { StyleSheet, Text, View } from "react-native";
import Navbar from "../components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutScreen({ children }) {
    return (
        <SafeAreaView style={[
            styles.container,
            {
                flexDirection: 'column',
            },
        ]}>
            <View style={{ flex: 1 }}>
                <Navbar />
                {children}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 5,
    },
});
