import Heading from '@/components/heading';
import { ProductCard } from '@/components/product-card';
import Separator from '@/components/separator';
import ThemeView from '@/components/theme-view';
import { Image } from 'expo-image';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useHygraphQueryResult } from '../../../lib/hooks/useHygraphQuery';
import { Mapper, productQuery } from '../../../lib/hygraph/queries/products';

const styles = StyleSheet.create({
    hero: {
        width: '100%',
        height: 400
    },
    columnWrapper: {
        gap: 20
    }
});

export default function Home() {
    const { data: products, loading, error } = useHygraphQueryResult(productQuery, Mapper);

    return (
        <ThemeView padded={false} edges={[]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 10, paddingBottom: 10 }}>
                <View>
                    <Image
                        source={"https://eu-west-2.graphassets.com/cmk70usra0h7o07mj3leebcq2/cmpwhnv6pdlc807mhm71qo10s"}
                        style={styles.hero}
                        contentFit='cover'
                    />
                </View>
                <Separator size={2.5} />
                <View className='gap-4 px-5'>
                    <Heading
                        title="New Arrivals"
                        href="/(tabs)/shop"
                        linkTitle="View All"
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                </View>
                <View className='px-4'>
                    <FlatList
                        data={products?.filter(i => i.tags.includes("home"))}
                        renderItem={({ item }) => <ProductCard data={item} className='m-2' />}
                        keyExtractor={item => item.id}
                        horizontal
                    />
                </View>
                <Separator />
                <View className='gap-4 px-5'>
                    <Heading
                        title="Featured Plants"
                        href="/(tabs)/shop"
                        linkTitle="View All"
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                </View>
                <View className='px-4'>
                    <FlatList
                        data={products?.filter(i => i.tags.includes("home"))}
                        renderItem={({ item }) => <ProductCard data={item} className='m-2' />}
                        keyExtractor={item => item.id}
                        horizontal
                    />
                </View>
            </ScrollView>
        </ThemeView>

    )
}