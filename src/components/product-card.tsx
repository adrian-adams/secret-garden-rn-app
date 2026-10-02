import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useHygraphQueryResult } from '../../lib/hooks/useHygraphQuery';
import { Mapper, productQuery, ProductUI } from '../../lib/hygraph/queries/products';
import { cn } from '../../lib/utils';

export interface FeaturedData {
    data: ProductUI
    className?: string
    type?: "Home" | "Shop"
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 125,
        borderRadius: 8
    }
})

export function ProductCard({ data, type, className }: FeaturedData) {
    const { data: products, loading, error } = useHygraphQueryResult(productQuery, Mapper);
    const page = products?.find((i) => i.slug === data.slug)

    return (
        <View className={cn(
            "px-2 h-50 w-45 grow rounded-xl bg-sg-lightgreen justify-evenly",
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
                <Text className='pb-2 text-xl font-ls-medium'>{data.title}</Text>
                {type === "Shop" &&
                    <>
                        <View className='flex-row items-center justify-between pb-4'>
                            <Text className='text-xl font-ls-bold'>${data.price}</Text>
                            <Pressable className='bg-black rounded-full px-2.5 py-0.5'>
                                <Text className='text-xl text-sg-lightgreen'>
                                    +
                                </Text>
                            </Pressable>
                        </View>
                        <Link
                            href={{ pathname: '/(tabs)/shop/[slug]', params: { slug: data.slug } }}
                            className='text-xl text-center utility-button-primary font-ls-medium text-sg-lightgreen'
                        >
                            View Details
                        </Link>
                    </>
                }
            </View>
        </View>
    )
}