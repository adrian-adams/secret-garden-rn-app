import { View } from 'react-native'
import { Skeleton } from './ui/skeleton'

export function ProductHeader() {
    return (
        <View className='relative p-4 bg-white'>
            <Skeleton className='absolute h-12 bg-black w-50 top-5 left-5 rounded-xl' />
            <Skeleton className='w-full h-[350px] rounded-xl bg-black' />
        </View>
    )
}