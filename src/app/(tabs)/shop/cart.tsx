import BackButton from '@/components/back-button';
import { CustomPressable, CustomText } from '@/components/custom';
import QtyControls from '@/components/product-qty-controls';
import Separator from '@/components/separator';
import ThemeView from '@/components/theme-view';
import { Button } from '@/components/ui/button';
import { Image } from 'expo-image';
import { Dot, Trash } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useCartStore } from '../../../../lib/zustand/cart';


const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 100,
        borderRadius: 10
    }
});

export default function Cart() {
    const data = useCartStore(state => state.items)
    const items = useCartStore((state) => state.items.find(i => i.id));
    const { unitPrice } = items ?? {}
    const subTotal = useCartStore((state) => state.subtotal);
    const totalItems = useCartStore((state) => state.totalItems());
    const clearCart = useCartStore((state) => state.clearCart);

    return (
        <ThemeView edges={[]} className='flex flex-col'>
            <View className='flex flex-row items-center justify-between'>
                <BackButton />
                <CustomPressable onPress={clearCart}>
                    <CustomText>
                        Clear Cart
                    </CustomText>
                </CustomPressable>
            </View>
            <Separator />
            {totalItems === 0 ?
                (
                    <View className='flex items-center justify-center flex-1 w-full'>
                        <CustomText size='4xl' className='text-black'>
                            You cart is empty
                        </CustomText>
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={data => data.id}
                        renderItem={({ item }) => <CartItem data={item} />}
                        ItemSeparatorComponent={<Separator color='black' size={15} />}
                    />
                )
            }
            <Separator size={3} />
            <View>
                <CustomPressable disabled={Number(totalItems) === 0}>
                    <CustomText>Go to Checkout - ${subTotal()}</CustomText>
                </CustomPressable>
            </View>
        </ThemeView>
    )
};

function CartItem({ data }: { data: CartItem }) {
    const item = useCartStore((state) => state.items.find(i => i.id === data.id));
    const { orderQuantity, id } = item ?? {};
    const updateQty = useCartStore((state) => state.updateQuantity);
    const deleteItem = useCartStore((state) => state.deleteItem);
    const subTotal = useCartStore((state) => state.subtotal);

    return (
        <View className='flex-row items-center justify-between gap-6'>
            {/* Image */}
            <View>
                <Image source={data.image} style={styles.image} />
            </View>

            <View className='flex-col flex-1 gap-4'>

                {/* Title, Size, Colour, Delete */}
                <View className='flex-row justify-between gap-4'>
                    <View className='flex-col flex-1'>
                        <CustomText align='left' size='xl'>{data.title}</CustomText>
                        <View className='flex-row items-center'>
                            <CartItemText text={`Size: ${data.size}`} />
                            <Dot size={10} />
                            <CartItemText text={`Colour: ${data.colour}`} />
                        </View>
                    </View>
                    <Button onPress={() => deleteItem(data.id)} className='px-2 py-1'>
                        <Trash size={16} />
                    </Button>
                </View>

                {/* Qty Controls, Price */}
                <View className='flex-row items-center justify-between'>
                    <QtyControls
                        quantity={Number(orderQuantity)}
                        decrement={() => updateQty(id ?? "", (orderQuantity ?? 0) - 1)}
                        increment={() => updateQty(id ?? "", (orderQuantity ?? 0) + 1)}
                    />
                    <Text className='text-xl font-ls-medium'>${Number(subTotal)}</Text>
                </View>
            </View>
        </View >
    )
};

function CartItemText({ text }: { text: string }) {
    return (
        <Text className='p-0 text-sm text-gray-600 font-ls-medium'>
            {text}
        </Text>
    )
};