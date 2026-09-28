import ThemeView from '@/components/theme-view';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHygraphQueryResult } from '../../../../lib/hooks/useHygraphQuery';
import { mapProduct, productQuery } from '../../../../lib/hygraph/queries/products';

export default function Product() {
    const params = useLocalSearchParams<{ slug: string }>()
    const { data: products, loading, error } = useHygraphQueryResult(productQuery, mapProduct);
    const item = products?.find((i) => i.slug === params.slug);

    const styles = StyleSheet.create({
        image: {
            width: "100%",
            height: 350
        }
    })

    return (
        <ThemeView padded={false} edges={[]}>
            <ScrollView>
                {error ? (
                    <Text>Failed to load information</Text>
                ) : (
                    <>
                        <View>
                            <Image source={item?.imageUrl} style={styles.image} />
                        </View>
                        <View className='p-4'>
                            <Text className='font-ls-extrabold text-4xl'>{item?.title}</Text>
                            <Text>{item?.productInfo}</Text>
                        </View>
                    </>

                )
                }
            </ScrollView>
        </ThemeView >
    )
}