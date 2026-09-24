import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Product() {
    const { slug } = useLocalSearchParams<{ slug: string }>();

    return (
        <View>
            <Text>{slug}</Text>
        </View>
    )
}