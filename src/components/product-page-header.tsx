import type { SharedRefType } from 'expo';
import { Image, type ImageSource } from 'expo-image';
import type { Href } from 'expo-router';
import { View, type ImageStyle, type StyleProp } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';
import BackButton from './back-button';

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

export default function ImageHeader({ source, style }: ImageHeaderProps) {
    return (
        <View className='relative'>
            <Image source={source} style={style} loading='eager' />
            <BackButton className='absolute top-5 left-5' />
        </View>
    )
}