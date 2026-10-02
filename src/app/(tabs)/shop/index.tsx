import { ProductCard } from '@/components/product-card';
import ThemeView from '@/components/theme-view';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import '../../../../global.css';
import { useHygraphQueryResult } from '../../../../lib/hooks/useHygraphQuery';
import { Mapper, productQuery } from '../../../../lib/hygraph/queries/products';
import { cn } from '../../../../lib/utils';

const gap: number = 30;

const styles = StyleSheet.create({
    listContent: {
        gap: gap,
        padding: 10
    },
    columnWrapper: {
        gap: gap
    }
})

export default function Shop() {
    const [search, setSearch] = useState<string>("");

    const { data: products, loading, error } = useHygraphQueryResult(productQuery, Mapper);

    const productLength = products?.filter(i => i.title.includes(search)).length;

    return (
        <ThemeView className='relative items-center' edges={[]}>
            {loading &&
                <View>
                    <Text>Loading...</Text>
                </View>
            }
            {error ?
                <View className='justify-center flex-1'>
                    <Text className='text-2xl font-ls-bold'>Failed to load products</Text>
                </View>
                :
                <>
                    <SearchBar lengthQ={productLength} searchQ={search} searchCallBack={setSearch} />
                    <FlatList
                        data={products?.filter(i => i.title?.toLowerCase().includes(search.toLowerCase()) && i.tags?.includes("shop"))}
                        renderItem={({ item }) => <ProductCard data={item} type="Shop" />}
                        keyExtractor={item => item.id}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={styles.listContent}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                </>

            }
        </ThemeView>
    )
}

function SearchBar({
    lengthQ,
    searchQ,
    searchCallBack }:
    {
        lengthQ: number | undefined,
        searchQ: string,
        searchCallBack: (value: string) => void
    }) {
    return (
        <View className={cn(
            "w-full pb-2",
            lengthQ === 0 && "pt-6"
        )}>
            <TextInput
                className='h-12 border border-sg-green rounded-xl font-ls-medium w-fit'
                value={searchQ}
                onChangeText={searchCallBack}
            />
            <View className='pt-2'>
                {lengthQ === 0 ?
                    <Text>&quot;{searchQ}&quot; did not match any results</Text>
                    :
                    <Text className='font-ls-medium'>{lengthQ} available</Text>
                }
            </View>

        </View>
    )
}