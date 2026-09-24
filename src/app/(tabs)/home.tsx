import ThemeView from '@/components/theme-view';
import { Text } from 'react-native';

export default function Home() {
    return (
        <ThemeView padded={false}>
            <Text className="text-2xl font-ls-extrabold text-blue-500">
                Welcome to Nativewind!
            </Text>
            <Text className="text-2xl text-blue-500">
                Welcome to Nativewind!
            </Text>
        </ThemeView>

    )
}