import { Image, ScrollView, Text, View } from 'react-native'
import convertDate from '../helper/convertDate'
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';



export default function PostScreen() {
    const [post, setPost] = useState({})
    const route = useRoute()
    const { slug } = route.params

    async function fetchPost() {
        try {
            const res = await fetch(`https://api-hck.sesber.com/public/posts/${slug}`)

            const data = await res.json()

            if (!res.ok) throw data

            setPost(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ backgroundColor: "white", overflow: "hidden" }}>
                    <Image
                        style={{ width: '100%', height: 200, }}
                        source={{
                            uri: post?.imgUrl,
                        }}
                    />
                    <View style={{ padding: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                            <Image style={{ width: 50, height: 50, borderRadius: 100, marginRight: 15 }} source={{
                                uri: `https://ui-avatars.com/api/?name=${post?.author?.username}`,
                            }} />
                            <View>
                                <Text style={{
                                    fontSize: 18, fontWeight: 600
                                }}>{post?.author?.username}</Text>
                                <Text style={{ fontSize: 15 }}>
                                    {convertDate(post?.createdAt)}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                            <AntDesign name="paperclip" size={14} color="black" />
                            <Text numberOfLines={1} style={{ marginLeft: 5, fontSize: 15, fontWeight: 600 }}>
                                {post?.category?.name}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
                            {post?.title}
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: "center", marginBottom: 15 }}>
                            {post?.tags?.map((tag) => {
                                return (
                                    <Text key={tag.id} style={{ marginRight: 10, marginBottom: 3, fontSize: 13, fontWeight: 400 }}>
                                        #{tag?.name}
                                    </Text>
                                )
                            })}
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ marginRight: 5, fontSize: 15, fontWeight: 400 }}>{post?.content}</Text>
                        </View>
                    </View>
                </View >
            </ScrollView>
        </SafeAreaView>
    )
}
