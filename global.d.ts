export { };

declare global {
    interface SingularItemProps {
        quantity: number
        colour: string
        size: string
        error: string
    }

    interface CartItem {
        id: string
        slug: string
        title: string
        colour: string
        size: string
        image: string
        unitPrice: number | string
        orderQuantity: number
        error?: string
        loadingItem?: boolean
    }
}