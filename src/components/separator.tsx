import { StyleSheet, View } from 'react-native';

const Colors = {
    transparent: "transparent",
    black: "#000000",
    green: "#0f342d"
}

interface SeparatorProps {
    size?: number
    color?: keyof typeof Colors
    horizontal?: boolean
}

export default function Separator({
    size = 10,
    color = "transparent",
    horizontal = true,
}: SeparatorProps) {
    const styles = StyleSheet.create({
        styleProps: {
            backgroundColor: color,
            marginTop: size,
            marginBottom: size,
            ...(horizontal ? { height: 5, width: "100%" } : { width: 5, height: "100%" }),
        }
    })

    return (
        <View
            style={styles.styleProps}
        />
    )
}