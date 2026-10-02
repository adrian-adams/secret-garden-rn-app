import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Minus, Plus } from 'lucide-react-native';
import { View } from 'react-native';

interface QtyControlsProps {
    quantity: number
    increment: () => void
    decrement: () => void
}

export default function QtyControls({ quantity, increment, decrement }: QtyControlsProps) {

    return (
        <View className='flex-row items-center gap-4'>
            <Button
                variant='addToCart'
                size='addToCart'
                onPress={decrement}
                disabled={quantity === 1}
            >
                <Text>
                    <Minus color='#fff' />
                </Text>
            </Button>
            <Input
                value={String(quantity)}
                keyboardType='number-pad'
                className='w-12 h-12 text-center border border-sg-green rounded-xl'
                editable
                textAlign='center'
                verticalAlign='middle'
            />
            <Button
                variant='addToCart'
                size='addToCart'
                onPress={increment}
            >
                <Text>
                    <Plus color='#fff' />
                </Text>
            </Button>
        </View>
    )
}