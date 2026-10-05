import { type Href } from 'expo-router';
import { View } from 'react-native';
import { CustomPressable, CustomText } from './custom';

export default function Heading({ title, href, linkTitle, desc, ...props }: { title: string, href: Href, linkTitle: string, desc?: string }) {
    return (
        <View className="flex-col gap-3">
            <View className='flex-row items-center justify-between w-full pb-2 border-b-2 border-sg-green'>
                <CustomText size='2xl'>{title}</CustomText>
                <CustomPressable href={href} {...props} className='mb-1'>
                    <CustomText>
                        {linkTitle}
                    </CustomText>
                </CustomPressable>
            </View>
            {desc &&
                <View>
                    <CustomText className='leading-tight text-gray-700' align='left'>
                        {desc}
                    </CustomText>
                </View>
            }
        </View>
    )
}