import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import { Text, View, type ImageStyle, type StyleProp } from 'react-native';
import { Badge } from './ui/badge';
import { type ImageSource } from 'expo-image';
import type { SFSymbol } from 'sf-symbols-typescript';
import type { SharedRefType } from 'expo';
import type { Href } from 'expo-router';

interface ImageHeaderProps {
    source: ImageSource
    | `sf:${SFSymbol}`
    | (string & {})
    | number
    | ImageSource[]
    | string[]
    | SharedRefType<'image'>
    | null
    style: StyleProp<ImageStyle>
    href: Href
}

export default function ImageHeader({ source, style, href }: ImageHeaderProps) {
    return (
        <View className='relative'>
            <Image source={source} style={style} />
            <Badge className='absolute w-30 top-5 left-5 bg-sg-lightgreen ring-1 ring-black'>
                <Link href={href} className='flex flex-row items-center justify-center gap-4'>
                    <Text>
                        <MoveLeft size={20} />
                    </Text>
                    <Text className='text-xl font-ls-extrabold'>
                        Back
                    </Text>
                </Link>
            </Badge>
        </View>
    )
}