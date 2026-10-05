import { Link, type Href } from 'expo-router'
import { MoveLeft } from 'lucide-react-native'
import { Pressable, Text } from 'react-native'
import { cn } from '../../lib/utils'

export default function BackButton({
    title = 'Back to Shop',
    href = '/shop',
    className,
}: {
    title?: string
    href?: Href
    className?: string
}) {
    return (
        <Link href={href} asChild>
            <Pressable
                className={cn(
                    'flex-row items-center justify-center gap-2 self-start',
                    'border-2 border-black rounded-xl py-1 px-3 bg-sg-lightgreen',
                    'utility-button-click',
                    className
                )}
            >
                <MoveLeft size={20} color="black" />
                <Text className="text-xl font-ls-medium">{title}</Text>
            </Pressable>
        </Link>
    )
}