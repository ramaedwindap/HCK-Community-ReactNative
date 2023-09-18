import { Image, ScrollView, Text, View } from 'react-native'
import convertDate from '../helper/convertDate'
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import { useQuery, gql } from '@apollo/client';


const GET_POST = gql`
    query Post($slug: String) {
      post(slug: $slug) {
        id
        title
        slug
        content
        imgUrl
        categoryId
        userMongoId
        createdAt
        updatedAt
        category {
          id
          name
        }
        tags {
          id
          postId
          name
        }
        author {
          _id
          username
          email
          phoneNumber
          address
        }
      }
    }
`;


export default function PostScreen() {
    const route = useRoute()
    const { slug } = route.params

    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            slug
        }
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    // Deconstruct posts from data
    const { post } = data;

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
