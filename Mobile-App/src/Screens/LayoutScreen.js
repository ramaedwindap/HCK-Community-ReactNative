import { Text, View } from "react-native";
import Navbar from "../components/Navbar";
import HomeScreen from "./HomeScreen";
import PostScreen from "./PostScreen";

export default function LayoutScreen() {
    return (
        <View style={{ flex: 1 }}>
            {/* <Text>LayoutScreen Screens</Text> */}
            <Navbar />
            {/* <HomeScreen /> */}
            <PostScreen />
        </View>
    )
}
