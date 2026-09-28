import { clsx } from 'clsx';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useHygraphQueryResult } from '../../lib/hooks/useHygraphQuery';
import { mapProduct, productQuery, ProductUI } from '../../lib/hygraph/queries/products';

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
    const { data: products, loading, error } = useHygraphQueryResult(productQuery, mapProduct);
    const page = products?.find((i) => i.slug === data.slug)

    return (
        <View className={clsx(
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
                <Text className='font-ls-medium text-xl pb-2'>{data.title}</Text>
                {type === "Shop" &&
                    <>
                        <View className='flex-row justify-between items-center pb-4'>
                            <Text className='font-ls-bold text-xl'>${data.price}</Text>
                            <Pressable className='bg-black rounded-full px-2.5 py-0.5'>
                                <Text className='text-xl text-sg-lightgreen'>
                                    +
                                </Text>
                            </Pressable>
                        </View>
                        <Link
                            href={{ pathname: '/(tabs)/shop/[slug]', params: { slug: data.slug } }}
                            className='utility-button-primary text-center font-ls-medium text-xl text-sg-lightgreen'
                        >
                            View Details
                        </Link>
                    </>
                }
            </View>
        </View>
    )
}