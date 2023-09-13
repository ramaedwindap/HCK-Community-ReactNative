import { FlatList, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
    const [posts, setPosts] = useState([])
    const [topTags, setTopTags] = useState([])

    async function fetchPosts() {
        try {
            const res = await fetch("https://api-hck.sesber.com/public/posts", { method: "GET" })

            const data = await res.json()

            if (!res.ok) throw data

            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchTopTags() {
        try {
            const res = await fetch("https://api-hck.sesber.com/public/top-tags", { method: "GET" })

            const data = await res.json()

            if (!res.ok) throw data

            setTopTags(data)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(posts)
    useEffect(() => {
        fetchPosts()
        fetchTopTags()
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: "rgb(241 245 249)" }}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard post={item} />}
                ListHeaderComponent={
                    <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {topTags.map((tag) => {
                                return (
                                    <View key={tag.tagName} style={{ padding: 10, marginRight: 10, borderRadius: 10, backgroundColor: "white" }}>
                                        <Text style={{ fontSize: 13, fontWeight: 500 }}>#{tag.tagName}</Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                }
            />
        </SafeAreaView>
    )
}
