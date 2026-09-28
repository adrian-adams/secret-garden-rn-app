import { Link, type Href } from 'expo-router';
import { Text, View } from 'react-native';

export default function Heading({ title, href, linkTitle, desc }: { title: string, href: Href, linkTitle: string, desc?: string }) {
    return (
        <View className="flex-col gap-3">
            <View className='w-full flex-row items-center justify-between border-b-2 border-sg-green pb-2'>
                <Text className='font-ls-medium text-2xl'>{title}</Text>
                <Link
                    href={href}
                    className='utility-button-primary font-ls-extrabold'
                >
                    {linkTitle}
                </Link>
            </View>
            <View>
                <Text className='font-ls-medium text-lg leading-tight text-gray-700'>
                    {desc}
                </Text>
            </View>
        </View>
    )
}