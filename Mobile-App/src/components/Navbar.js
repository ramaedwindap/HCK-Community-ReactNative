import { Pressable, Text, View } from "react-native";
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: "white", paddingHorizontal: 15, paddingVertical: 8, alignItems: "center", flexDirection: 'row', justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <Pressable>
                    <Entypo name="menu" size={30} color="black" />
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('Home') }}>
                    <View style={{ backgroundColor: 'black', padding: 8, borderRadius: 8 }}>
                        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>HCK</Text>
                    </View>
                </Pressable>
            </View>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <Pressable>
                    <Feather name="search" size={30} color="black" />
                </Pressable>
                <Pressable style={{ backgroundColor: 'white', padding: 8, borderRadius: 10, borderWidth: 1, borderColor: 'blue' }}>
                    <Text style={{ color: "blue", fontSize: 17 }}>Create Account</Text>
                </Pressable>
            </View>
        </View>
    )
}
