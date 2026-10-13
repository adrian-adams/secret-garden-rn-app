import { CustomText } from '@/components/custom';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '../../../lib/utils';

interface ShippingRadioProps {
    value: string,
    id: string,
    label: string,
    subLabel: string
    onSelect: (value: string) => void
    selected: boolean
}

interface ShippingOptions {
    id: string
    value: string
    label: string
    subLabel: string
}

const SHIPPING_OPTIONS: ShippingOptions[] = [
    {
        id: 'r1',
        value: 'shipping-ups-ground',
        label: 'UPS Ground Shipping',
        subLabel: '3-5 Business Days'
    },
    {
        id: 'r2',
        value: 'shipping-ups-surepost',
        label: 'UPS/USPS Surepost',
        subLabel: '4-7 Business Days'
    }
];

export function Shipping() {
    const [value, setValue] = React.useState(SHIPPING_OPTIONS[0].value);

    const handleSelect = React.useCallback((next: string) => {
        if (next === value) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setValue(next);
    }, [value])

    return (
        <View className='flex-col gap-4'>
            <RadioGroup value={value} onValueChange={handleSelect}>
                {SHIPPING_OPTIONS.map((i) => (
                    <ShippingRadioItem
                        key={i.id}
                        {...i}
                        selected={value === i.value}
                        onSelect={handleSelect}
                    />
                ))}
            </RadioGroup>
        </View>
    )
}

export function ShippingRadioItem({ ...props }: ShippingRadioProps) {
    return (
        <Pressable
            onPress={() => props.onSelect(props.value)}
            accessibilityRole='radio'
            accessibilityState={{ checked: props.selected }}
            className={cn(
                'p-2 border-2 rounded-xl',
                props.selected ? 'border-black' : 'border-gray-300'
            )}
        >
            <View className='flex-row items-center gap-2'>
                <RadioGroupItem
                    value={props.value}
                    id={props.id}
                />
                <Label htmlFor={props.id} onPress={() => props.onSelect(props.value)}>
                    <CustomText font="extrabold">
                        {props.label}
                    </CustomText>
                </Label>
            </View>
            <CustomText align='left' font='medium' className='ps-7'>{props.subLabel}</CustomText>
        </Pressable>
    )
}






