import { ProductAccordion, type AccordionProps } from '@/components/product-accordion';
import ImageHeader from '@/components/product-page-header';
import QtyControls from '@/components/product-qty-controls';
import { ProductSelect } from '@/components/product-select';
import Separator from '@/components/separator';
import ThemeView from '@/components/theme-view';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import { Droplet, FaceSlightlySmiling, ListSortDescending, Sun, Van } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useHygraphQueryResult } from '../../../../lib/hooks/useHygraphQuery';
import { Mapper, productQuery } from '../../../../lib/hygraph/queries/products';
import { useCartStore } from '../../../../lib/zustand/cart';

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 350
    },
    posButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#000",
        width: 20,
        margin: "auto"
    },
    posText: {
        color: "#000"
    }
});

const defaultText = "Check back for more info";

export default function Product() {
    const params = useLocalSearchParams<{ slug: string }>();
    const [singularItem, setSingularItem] = useState<CartItem>({
        id: "",
        slug: "",
        title: "",
        colour: "",
        size: "",
        image: "",
        unitPrice: 0,
        orderQuantity: 1,
        error: "",
        loadingItem: false
    });
    const addItem = useCartStore((state) => state.addItem);
    const { data: products, loading, error } = useHygraphQueryResult(productQuery, Mapper);
    const item = products?.find((i) => i.slug === params.slug);
    const selectSize = item?.plantSize ?? [];
    const selectColors = item?.plantColour ?? [];

    const accordionData: AccordionProps[] = [
        {
            title: "Product Info",
            desc: item?.productInfo ?? defaultText,
            icon: ListSortDescending,
        },
        {
            title: "Sun",
            desc: item?.sun ?? defaultText,
            icon: Sun,
        },
        {
            title: "Water",
            desc: item?.water ?? defaultText,
            icon: Droplet,
        },
        {
            title: "Pet Friendly?",
            desc: item?.petFriendly ? "Yes" : "No",
            icon: FaceSlightlySmiling,
        },
        {
            title: "Delivery",
            desc: `Delivery between ${item?.deliveryRange} ${item?.deliveryTime}`,
            icon: Van,
        }
    ];

    function handleAddToCart() {
        if (!singularItem.colour || !singularItem.size) {
            setSingularItem({
                ...singularItem,
                error: singularItem.error = "Please select a colour and size"
            });
            return;
        }

        try {
            setSingularItem({
                ...singularItem,
                loadingItem: singularItem.loadingItem = true
            });

            addItem(
                {
                    id: item?.slug ?? "",
                    slug: item?.slug ?? "",
                    title: item?.title ?? "",
                    colour: singularItem.colour,
                    size: singularItem.size,
                    image: item?.imageUrl ?? "",
                    unitPrice: item?.price ?? 0,
                },
                singularItem.orderQuantity
            );

        } catch (error) {

        } finally {
            setInterval(() => {
                setSingularItem({
                    ...singularItem,
                    loadingItem: singularItem.loadingItem = false
                });
            }, 2000);
        }
    }

    return (
        <ThemeView padded={false} edges={[]}>
            <ScrollView>
                {loading &&
                    <View>
                        <Text>Loading...</Text>
                    </View>
                }
                {error ? (
                    <View className='items-center justify-center h-20'>
                        <Text>Failed to load product</Text>
                    </View>
                ) : (
                    <>
                        <ImageHeader
                            source={item?.imageUrl ?? ""}
                            style={styles.image}
                            href='/(tabs)/shop'
                        />
                        <View className='p-4'>
                            <Text className='text-4xl font-ls-extrabold'>{item?.title}</Text>
                            <Separator />
                            <View className='gap-4'>
                                <View className='flex-row items-center justify-between'>
                                    <QtyControls
                                        quantity={singularItem.orderQuantity}
                                        decrement={() => setSingularItem({
                                            ...singularItem,
                                            orderQuantity: singularItem.orderQuantity - 1,
                                        })}
                                        increment={() => setSingularItem({
                                            ...singularItem,
                                            orderQuantity: singularItem.orderQuantity + 1,
                                        })}
                                    />
                                    {singularItem.orderQuantity > 1 &&
                                        <Text className='flex-1 px-4 text-3xl font-ls-medium'>
                                            &#42; ${item?.price}
                                        </Text>
                                    }
                                    <Text className='text-3xl font-ls-medium'>${(item?.price ?? 1) * singularItem.orderQuantity}</Text>
                                </View>
                                <View className='flex-row items-center justify-between gap-2'>
                                    <ProductSelect
                                        data={selectSize}
                                        placeholder='Select size'
                                        label="Sizes"
                                        value={(value) => setSingularItem({
                                            ...singularItem,
                                            size: value
                                        })}
                                    />
                                    <ProductSelect
                                        data={selectColors}
                                        placeholder='Select colour'
                                        label="Colours"
                                        value={(value) => setSingularItem({
                                            ...singularItem,
                                            colour: value
                                        })}
                                    />
                                </View>
                                {singularItem.error &&
                                    <View>
                                        <Text className='text-center text-red-500 font-ls-medium'>
                                            {singularItem.error}
                                        </Text>
                                    </View>
                                }
                                <View>
                                    <Button
                                        onPress={handleAddToCart}
                                        variant='addToCart'
                                    // disabled={cartItems.length === 0}
                                    >
                                        <Text>
                                            {singularItem.loadingItem ? (
                                                <>Adding to cart...</>
                                            ) : (
                                                <>Add to cart</>
                                            )
                                            }
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                            <Separator />
                            <ProductAccordion data={accordionData} />
                        </View>
                    </>
                )}
            </ScrollView>
        </ThemeView >
    )
}