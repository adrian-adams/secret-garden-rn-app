import ThemeView from '@/components/theme-view';
import { Text } from 'react-native';
import '../../../../global.css';

export default function Shop() {
    return (
        <ThemeView className='utility-flex-center'>
            <Text className="text-xl font-bold text-blue-500">
                Welcome to Nativewind!
            </Text>
        </ThemeView>
    )
}