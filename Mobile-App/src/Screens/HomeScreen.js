import { FlatList, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
    query Posts {
      posts {
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


export default function HomeScreen() {

    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    // Deconstruct posts from data
    const { posts } = data;

    return (
        <SafeAreaView style={{ backgroundColor: "rgb(241 245 249)" }}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard post={item} />}
                ListHeaderComponent={
                    <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {/* {topTags.map((tag) => {
                                return (
                                    <View key={tag.tagName} style={{ padding: 10, marginRight: 10, borderRadius: 10, backgroundColor: "white" }}>
                                        <Text style={{ fontSize: 13, fontWeight: 500 }}>#{tag.tagName}</Text>
                                    </View>
                                )
                            })} */}
                        </ScrollView>
                    </View>
                }
            />
        </SafeAreaView>
    )
}
