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
})

export default function Cart() {
    const items = useCartStore((state) => state.items);

    return (
        <ThemeView>
            <View className='flex-row'>
                <FlatList
                    data={items}
                    keyExtractor={items => items.id}
                    renderItem={({ item }) => <CartItem data={item} />}
                    ItemSeparatorComponent={<Separator color='black' size={15} />}
                />
            </View>
        </ThemeView>
    )
}

function CartItem({ data }: { data: CartItem }) {
    const itemTotal = data.orderQuantity * Number(data.unitPrice);
    const deleteItem = useCartStore((state) => state.deleteItem);

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
                        <Text className='text-xl font-ls-medium'>{data.title}</Text>
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
                        quantity={data.orderQuantity}
                        decrement={() => data.orderQuantity--}
                        increment={() => data.orderQuantity++}
                    />
                    <Text className='text-xl font-ls-medium'>${itemTotal}</Text>
                </View>
            </View>
        </View>
    )
}

function CartItemText({ text }: { text: string }) {
    return (
        <Text className='p-0 text-sm text-gray-600 font-ls-medium'>
            {text}
        </Text>
    )
}