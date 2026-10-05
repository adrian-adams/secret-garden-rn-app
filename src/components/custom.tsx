import { Link, type Href } from 'expo-router';
import { Pressable, Text, type PressableProps, type TextProps } from 'react-native';
import { cn } from '../../lib/utils';

const fontFamily = {
    thin: "font-ls-thin",
    extralight: "font-ls-extralight",
    light: "font-ls-light",
    medium: "font-ls-medium",
    regular: "font-ls-regular",
    semibold: "font-ls-semibold",
    bold: "font-ls-bold",
    extrabold: "font-ls-extrabold",
    black: "font-ls-black"
} as const;

const fontSize = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
} as const;

const textAlign = {
    left: "text-start",
    center: "text-center",
    right: "text-end"
} as const;


interface CustomTextProps extends TextProps {
    font?: keyof typeof fontFamily
    size?: keyof typeof fontSize
    align?: keyof typeof textAlign
    className?: string
}

export function CustomText({
    font = 'medium',
    size = 'lg',
    align = 'center',
    className,
    ...props
}: CustomTextProps) {
    return (
        <Text
            className={cn(fontFamily[font], fontSize[size], textAlign[align], className)}
            {...props}
        />
    )
}

const bgColour = {
    green: "bg-sg-green",
    lightgreen: "bg-sg-lightgreen",
    olive: "bg-sg-olive",
    locator: "bg-sg-locator",
    ribbon: "bg-sg-ribbon",
    black: "bg-black",
    transparent: "transparent"
} as const;

interface CustomPressableProps extends PressableProps {
    href?: Href
    backgroundColour?: keyof typeof bgColour
    className?: string
}

export function CustomPressable({
    backgroundColour = "lightgreen",
    className,
    href,
    ...props
}: CustomPressableProps) {
    const pressable = (
        <Pressable
            accessibilityRole={href ? 'link' : 'button'}
            className={cn(
                'utility-button-click',
                bgColour[backgroundColour],
                className
            )}
            {...props}
        />
    );

    return (
        <>
            {href ? (
                <Link href={href} asChild>
                    {pressable}
                </Link>
            ) : (
                <>
                    {pressable}
                </>
            )}
        </>
    )
}