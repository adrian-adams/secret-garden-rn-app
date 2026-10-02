import { Text } from '@/components/ui/text';
import { Link, type Href } from 'expo-router';
import { View } from 'react-native';

export default function Heading({ title, href, linkTitle, desc }: { title: string, href: Href, linkTitle: string, desc?: string }) {
    return (
        <View className="flex-col gap-3">
            <View className='flex-row items-center justify-between w-full pb-2 border-b-2 border-sg-green'>
                <Text className='text-2xl font-ls-medium'>{title}</Text>
                <Link
                    href={href}
                    className='utility-button-primary'
                >
                    <Text className='text-white'>
                        {linkTitle}
                    </Text>
                </Link>
            </View>
            {desc &&
                <View>
                    <Text className='text-lg leading-tight text-gray-700 font-ls-medium'>
                        {desc}
                    </Text>
                </View>
            }
        </View>
    )
}