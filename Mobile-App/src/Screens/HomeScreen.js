import { FlatList, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, gql } from '@apollo/client';
import HomeSkeleton from "./HomeSkeleton";

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

const GET_TOP_TAGS = gql`
    query TopTags {
      topTags {
        tagName
      }
    }
`;


export default function HomeScreen() {

    const { loading: loadingPosts, error: errorPosts, data: dataPosts } = useQuery(GET_POSTS);
    const { loading: loadingTopTags, error: errorTopTags, data: dataTopTags } = useQuery(GET_TOP_TAGS);



    if (errorPosts) return <Text>Error Posts: {errorPosts.message}</Text>;
    if (errorTopTags) return <Text>Error Top Tags: {errorTopTags.message}</Text>;

    return (
        <SafeAreaView style={{ backgroundColor: "rgb(241 245 249)" }}>
            {loadingPosts || loadingTopTags ?
                <HomeSkeleton /> :
                <FlatList
                    data={dataPosts?.posts}
                    renderItem={({ item }) => <PostCard post={item} />}
                    ListHeaderComponent={
                        <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {dataTopTags?.topTags.map((tag) => {
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
            }
        </SafeAreaView>
    )
}
