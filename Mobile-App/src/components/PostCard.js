import { Image, Text, View } from "react-native";
import convertDate from "../helper/convertDate";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import readingTime from "../helper/readingTime";

export default function PostCard({ post }) {
    return (
        <View style={{ backgroundColor: "white", overflow: "hidden", marginBottom: 15 }}>
            <Image
                style={{ width: '100%', height: 200, }}
                source={{
                    uri: post?.imgUrl,
                }}
            />
            <View style={{ padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 100, marginRight: 15 }} source={{
                        uri: `https://ui-avatars.com/api/?name=${post?.author?.username}`,
                    }} />
                    <View>
                        <Text style={{
                            fontSize: 18, fontWeight: 600
                        }}>{post.author.username}</Text>
                        <Text style={{ fontSize: 15 }}>{convertDate(post?.createdAt)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, paddingLeft: 65 }}>
                    <AntDesign name="paperclip" size={14} color="black" />
                    <Text numberOfLines={1} style={{ marginLeft: 5, fontSize: 15, fontWeight: 600 }}>{post?.category?.name}</Text>
                </View>
                <Text numberOfLines={2} style={{ marginLeft: 66, fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{post?.title}</Text>
                <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: "center", marginBottom: 5, paddingLeft: 55 }}>
                    {post?.tags.map((tag) => {
                        return (
                            <Text key={tag.id} style={{ marginLeft: 10, marginBottom: 3, fontSize: 13, fontWeight: 400 }}>
                                #{tag?.name}
                            </Text>
                        )
                    })}
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: "center", marginBottom: 5, paddingLeft: 65 }}>
                    <Text style={{ marginRight: 5, fontSize: 12, fontWeight: 600 }}>{readingTime(post?.content)} min read</Text>
                    <Ionicons name="bookmark" size={14} color="black" />
                </View>
            </View>
        </View >
    )
}
