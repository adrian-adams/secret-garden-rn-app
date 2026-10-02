import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import type { TriggerRef } from '@rn-primitives/select';
import { useRef } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ProductSelectProps {
    data: {
        value: string
        label: string
    }[]
    placeholder: string
    label: string
    value: (value: string) => void
}

export function ProductSelect({ data, placeholder, label, value }: ProductSelectProps) {
    const ref = useRef<TriggerRef>(null);
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
        left: 12,
        right: 12,
    };

    return (
        <View className='flex-1'>
            <Select onValueChange={(option) => {
                if (option !== undefined) value(option.value);
            }}>
                <SelectTrigger ref={ref} >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className='bg-white'>
                    <SelectGroup>
                        <SelectLabel className='text-lg'>
                            {label}
                        </SelectLabel>
                        {data.map((i) => (
                            <SelectItem
                                key={i.value}
                                label={i.label}
                                value={i.value}
                                className='text-2xl!'
                            >
                                {i.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </View>
    )
}