import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ShoppingBasket } from 'lucide-react-native';
import { styled } from 'nativewind';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../lib/zustand/cart';
import { CustomPressable } from './custom';
import { Badge } from './ui/badge';

const SafeAreaView = styled(RNSafeAreaView);

const styles = StyleSheet.create({
    image: {
        width: 125,
        height: 75
    }
});

export default function Nav() {
    const totalItems = useCartStore((state) => state.totalItems());

    return (
        <SafeAreaView edges={['top']}>
            <View className='flex-row items-center justify-between bg-sg-locator'>
                <View>
                    <Link href="/(tabs)/home">
                        <Image
                            source="https://eu-west-2.graphassets.com/cmk70usra0h7o07mj3leebcq2/cmlo42k6dfhse08mq1tropg00"
                            alt="Secret Garden"
                            contentFit="contain"
                            style={styles.image}
                        />
                    </Link>
                </View>
                <View className='pb-1'>
                    <CustomPressable href='/(tabs)/shop/cart' className='relative mx-5 h-15 w-30'>
                        <Badge className='absolute px-3 pb-0 bg-black right-1 top-1'>
                            <Text className='text-xl text-sg-lightgreen font-ls-medium'>
                                {totalItems}
                            </Text>
                        </Badge>
                        <ShoppingBasket size={45} />
                    </CustomPressable>
                </View>
            </View>
        </SafeAreaView>
    )
}