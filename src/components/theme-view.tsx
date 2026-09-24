import { clsx } from 'clsx';
import { styled } from 'nativewind';
import { type ReactNode } from 'react';
import { SafeAreaView as RNSafeAreaView, type Edge } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

interface ThemeViewProps {
    children: ReactNode
    padded?: boolean
    edges?: Edge[]
    className?: string
}

export default function ThemeView({
    children,
    padded = true,
    edges = ['top'],
    className = ''
}: ThemeViewProps) {
    return (
        <SafeAreaView
            edges={edges}
            className={clsx(
                'flex-1 bg-sg-locator',
                padded ? 'p-5' : '',
                className
            )}
        >
            {children}
        </SafeAreaView>
    )
}