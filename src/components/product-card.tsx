import { Image } from 'expo-image';
import { ShoppingBasket } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { ProductUI } from '../../lib/hygraph/queries/products';
import { cn } from '../../lib/utils';
import { useCartStore } from '../../lib/zustand/cart';
import { CustomPressable, CustomText } from '../components/custom';

export interface FeaturedData {
    data: ProductUI
    className?: string
    type?: "Home" | "Shop"
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        aspectRatio: 4 / 4,
        borderRadius: 8
    }
})

export function ProductCard({ data, type, className }: FeaturedData) {
    // const { data: products, loading, error } = useHygraphQueryResult(productQuery, Mapper);
    const item = useCartStore((s) => s.items.find(i => i.id === data.slug));

    return (
        <View className={cn(
            "px-3 max-w-40 h-50 grow rounded-xl bg-sg-lightgreen overflow-hidden",
            "flex flex-col justify-evenly items-center",
            type === "Shop" && "h-75",
            className
        )}>
            <View>
                <Image
                    source={data.imageUrl}
                    alt={data.title}
                    style={styles.image}
                    contentFit='fill'
                />
            </View>
            <View>
                <CustomText className='pb-2' size='xl' align='left'>{data.title}</CustomText>
                {type === "Shop" &&
                    <>
                        <View className='flex flex-row items-center justify-between pb-2'>
                            <CustomText align='left'>${data.price}</CustomText>
                            {item && <ShoppingBasket />}
                        </View>
                        <CustomPressable
                            href={{
                                pathname: '/(tabs)/shop/[slug]',
                                params: { slug: data.slug }
                            }}
                            backgroundColour='green'
                        >
                            <CustomText className='text-white'>
                                View Details
                            </CustomText>
                        </CustomPressable>
                    </>
                }
            </View>
        </View>
    )
}