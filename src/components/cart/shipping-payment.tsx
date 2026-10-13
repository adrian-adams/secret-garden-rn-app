import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';
import { View, type KeyboardTypeOptions, type TextInputIOSProps, type TextInputProps } from 'react-native';
import { cn } from '../../../lib/utils';
import { CustomText } from '../custom';

interface InputProps {
    id: string,
    label: string,
    keyboardTypeOptions: KeyboardTypeOptions
    textContentType: TextInputIOSProps['textContentType']
    autoComplete?: TextInputProps['autoComplete']
    placeholder?: string
    className?: string
}

type TabsOptions = "paypal" | "creditCard"

type PaymentField = "email" | "cardholderName" | "cardNumber" | "month" | "year" | "cvc"
type PaymentState = Record<PaymentField, string>

const initialPaymentState: PaymentState = {
    email: "",
    cardholderName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
}

const PAYMENT_OPTIONS: InputProps[] = [
    {
        id: "email",
        label: "Email Address",
        keyboardTypeOptions: "email-address",
        textContentType: 'emailAddress',
        className: "flex-1 w-full"
    },
    {
        id: "cardholderName",
        label: "Cardholder Name",
        keyboardTypeOptions: "default",
        textContentType: 'creditCardName',
        className: "flex-1 w-full"
    },
    {
        id: "cardNumber",
        label: "Card Number",
        keyboardTypeOptions: "number-pad",
        textContentType: "creditCardNumber",
    },
    {
        id: "month",
        label: "Month",
        keyboardTypeOptions: "numeric",
        textContentType: "creditCardExpirationMonth",
        className: 'w-6/12'
    },
    {
        id: "year",
        label: "Year",
        keyboardTypeOptions: "numeric",
        textContentType: "creditCardExpirationYear",
        className: 'w-6/12'
    },
    {
        id: "cvc",
        label: "CVC",
        keyboardTypeOptions: "numeric",
        textContentType: "creditCardSecurityCode",
    }
]

export function Payment() {
    const [value, setValue] = React.useState<PaymentState>(initialPaymentState);
    const [tabsValue, setTabsValue] = React.useState<TabsOptions>("paypal");

    return (
        <View>
            <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value as TabsOptions)}>
                <TabsList className='flex flex-row w-full px-4 bg-gray-300 h-14 rounded-xl justify-evenly'>
                    <TabsTrigger
                        value="paypal"
                        className={cn(
                            'px-4 w-6/12',
                            tabsValue === "paypal" && "bg-gray-500"
                        )}
                    >
                        <CustomText>
                            PayPal
                        </CustomText>
                    </TabsTrigger>
                    <TabsTrigger
                        value="creditCard"
                        className={cn(
                            'px-4 w-6/12',
                            tabsValue === "creditCard" && "bg-gray-500"
                        )}
                    >
                        <CustomText>
                            Credit Card
                        </CustomText>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="paypal">
                    <View className='flex flex-wrap gap-2'>
                        {PAYMENT_OPTIONS.filter(i => i.id.includes('email')).map(i => {
                            const fieldId = i.id as PaymentField;

                            return (
                                <PaymentInput
                                    key={i.id}
                                    {...i}
                                    value={value[fieldId]}
                                    onValueChange={(input) =>
                                        setValue((prev) => ({
                                            ...prev,
                                            [fieldId]: input,
                                        }))
                                    }
                                />
                            );
                        })}
                    </View>
                </TabsContent>
                <TabsContent value="creditCard">
                    <View className='flex flex-wrap gap-2'>
                        {PAYMENT_OPTIONS.filter(i => i.id !== 'email').map(i => {
                            const fieldId = i.id as PaymentField;

                            return (
                                <PaymentInput
                                    key={i.id}
                                    {...i}
                                    value={value[fieldId]}
                                    onValueChange={(input) =>
                                        setValue((prev) => ({
                                            ...prev,
                                            [fieldId]: input,
                                        }))
                                    }
                                />
                            );
                        })}
                    </View>
                </TabsContent>
            </Tabs>
        </View>
    )
}

type PaymentInputProps = InputProps & {
    value: string
    onValueChange: (input: string) => void
}

export function PaymentInput({ ...props }: PaymentInputProps) {
    return (
        <View
            className={cn(
                '',
                props.className
            )}
        >
            <Label
                htmlFor={props.id}
                nativeID={props.id}
                className='pb-2 text-gray-500 text-md font-ls-medium'
            >
                {props.label}
            </Label>
            <Input
                id={props.id}
                nativeID={props.id}
                value={props.value}
                onChangeText={props.onValueChange}
                keyboardType={props.keyboardTypeOptions}
                textContentType={props.textContentType}
                autoComplete={props.autoComplete}
                placeholder={props.placeholder}
                allowFontScaling
                className='h-12 border-gray-500'
            />
        </View>
    )
}