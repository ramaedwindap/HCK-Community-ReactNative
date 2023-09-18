import { Text, View } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function HomeSkeleton() {
    return (
        <View>
            <View style={{ padding: 10, marginRight: 10, borderRadius: 10, backgroundColor: "white" }}>
                <Text style={{ fontSize: 13, fontWeight: 500, backgroundColor: '#e0e0e0', color: 'transparent', width: 80 }}>#loading...</Text>
            </View>
            <View style={{ backgroundColor: 'white', overflow: 'hidden', marginBottom: 15 }}>
                {/* Image Skeleton */}
                <View style={{ width: '100%', height: 200, backgroundColor: '#e0e0e0' }} />

                <View style={{ padding: 15 }}>
                    {/* Author Section Skeleton */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#e0e0e0', marginRight: 15 }} />
                        <View>
                            <Text style={{ backgroundColor: '#e0e0e0', height: 20, width: 100, marginBottom: 5, borderRadius: 8 }} />
                            <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 60, borderRadius: 8 }} />
                        </View>
                    </View>

                    {/* Category Section Skeleton */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, paddingLeft: 65 }}>
                        <AntDesign name="paperclip" size={14} color="#e0e0e0" />
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 100, marginLeft: 5, borderRadius: 8 }} />
                    </View>

                    {/* Title Skeleton */}
                    <Text style={{ backgroundColor: '#e0e0e0', height: 24, width: '70%', marginLeft: 66, marginBottom: 10, borderRadius: 5 }} />

                    {/* Tags Skeleton */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 5, paddingLeft: 55 }}>
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 50, marginLeft: 10, marginBottom: 3, borderRadius: 8 }} />
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 50, marginLeft: 10, marginBottom: 3, borderRadius: 8 }} />
                    </View>

                    {/* Reading Time Skeleton */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5, paddingLeft: 65 }}>
                        <Text style={{ backgroundColor: '#e0e0e0', height: 12, width: 70, marginRight: 5, borderRadius: 10 }} />
                        <Ionicons name="bookmark" size={14} color="#e0e0e0" />
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', overflow: 'hidden', marginBottom: 15 }}>
                {/* Image Skeleton */}
                <View style={{ width: '100%', height: 200, backgroundColor: '#e0e0e0' }} />

                <View style={{ padding: 15 }}>
                    {/* Author Section Skeleton */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#e0e0e0', marginRight: 15 }} />
                        <View>
                            <Text style={{ backgroundColor: '#e0e0e0', height: 20, width: 100, marginBottom: 5, borderRadius: 8 }} />
                            <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 60, borderRadius: 8 }} />
                        </View>
                    </View>

                    {/* Category Section Skeleton */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, paddingLeft: 65 }}>
                        <AntDesign name="paperclip" size={14} color="#e0e0e0" />
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 100, marginLeft: 5, borderRadius: 8 }} />
                    </View>

                    {/* Title Skeleton */}
                    <Text style={{ backgroundColor: '#e0e0e0', height: 24, width: '70%', marginLeft: 66, marginBottom: 10, borderRadius: 5 }} />

                    {/* Tags Skeleton */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 5, paddingLeft: 55 }}>
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 50, marginLeft: 10, marginBottom: 3, borderRadius: 8 }} />
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 50, marginLeft: 10, marginBottom: 3, borderRadius: 8 }} />
                    </View>

                    {/* Reading Time Skeleton */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5, paddingLeft: 65 }}>
                        <Text style={{ backgroundColor: '#e0e0e0', height: 12, width: 70, marginRight: 5, borderRadius: 10 }} />
                        <Ionicons name="bookmark" size={14} color="#e0e0e0" />
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', overflow: 'hidden', marginBottom: 15 }}>
                {/* Image Skeleton */}
                <View style={{ width: '100%', height: 200, backgroundColor: '#e0e0e0' }} />

                <View style={{ padding: 15 }}>
                    {/* Author Section Skeleton */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#e0e0e0', marginRight: 15 }} />
                        <View>
                            <Text style={{ backgroundColor: '#e0e0e0', height: 20, width: 100, marginBottom: 5, borderRadius: 8 }} />
                            <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 60, borderRadius: 8 }} />
                        </View>
                    </View>

                    {/* Category Section Skeleton */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, paddingLeft: 65 }}>
                        <AntDesign name="paperclip" size={14} color="#e0e0e0" />
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 100, marginLeft: 5, borderRadius: 8 }} />
                    </View>

                    {/* Title Skeleton */}
                    <Text style={{ backgroundColor: '#e0e0e0', height: 24, width: '70%', marginLeft: 66, marginBottom: 10, borderRadius: 5 }} />

                    {/* Tags Skeleton */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 5, paddingLeft: 55 }}>
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 50, marginLeft: 10, marginBottom: 3, borderRadius: 8 }} />
                        <Text style={{ backgroundColor: '#e0e0e0', height: 15, width: 50, marginLeft: 10, marginBottom: 3, borderRadius: 8 }} />
                    </View>

                    {/* Reading Time Skeleton */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5, paddingLeft: 65 }}>
                        <Text style={{ backgroundColor: '#e0e0e0', height: 12, width: 70, marginRight: 5, borderRadius: 10 }} />
                        <Ionicons name="bookmark" size={14} color="#e0e0e0" />
                    </View>
                </View>
            </View>
        </View>
    )
}
