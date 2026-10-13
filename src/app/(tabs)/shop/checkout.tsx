import BackButton from '@/components/back-button';
import { Payment } from '@/components/cart/shipping-payment';
import { Shipping } from '@/components/cart/shipping-radio';
import { CustomPressable, CustomText } from '@/components/custom';
import Separator from '@/components/separator';
import ThemeView from '@/components/theme-view';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useCartStore } from '../../../../lib/zustand/cart';

interface CheckoutProps {
    title: string
    subtitle?: string
    content: ReactNode
}

const checkoutData: CheckoutProps[] = [
    {
        title: "Shipping",
        subtitle: "Select Method",
        content: <Shipping />
    },
    {
        title: "Payment",
        subtitle: "Select Payment",
        content: <Payment />
    },
    {
        title: "Promo Code",
        content: <PromoCode />
    },
    {
        title: "Total Cost",
        content: <TotalCost />
    }
]

export default function Checkout() {
    const total = useCartStore(s => s.subtotal);
    return (
        <ThemeView edges={[]} padded={false}>
            <View className='flex flex-row items-center justify-between px-4 py-6 border-b border-gray-300'>
                <CustomText size='2xl'>Checkout</CustomText>
                <BackButton title="Back to Cart" href='/shop/cart' />
            </View>
            <Separator size={1.5} />
            <ScrollView>
                <View className='flex-1 px-4'>
                    <Accordion type="single">
                        {checkoutData.map((i, index) => (
                            <AccordionItem key={i.title} value={`value-${index}`}>
                                <AccordionTrigger>
                                    <CustomText>
                                        {i.title}
                                    </CustomText>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {i.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </View>
            </ScrollView>
            <View className='p-4'>
                <CustomPressable>
                    <CustomText>Place Order - ${total()}</CustomText>
                </CustomPressable>
            </View>
        </ThemeView>
    )
}

function PromoCode() {
    return (
        <>
        </>
    )
}

function TotalCost() {
    const total = useCartStore(s => s.subtotal);
    return (
        <View>
            <CustomText>
                ${total()}
            </CustomText>
        </View>
    )
}