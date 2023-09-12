import { FlatList } from "react-native";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
    const [posts, setPosts] = useState([])

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
    // console.log(posts)
    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: "rgb(241 245 249)" }}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard post={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
