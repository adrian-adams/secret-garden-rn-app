import { create } from 'zustand';

export interface CartItem {
    id: string,
    slug: string
    title: string
    color: string
    size: string
    image: string
    unitPrice: number | string
    orderQuantity: number | string
}

export interface CartState {
    items: CartItem[]
    loadingItem: boolean
    thankYouMessage: boolean
}

export interface CartActions {
    addItem: (item: Omit<CartItem, 'orderQuantity'>, orderQuantity?: number) => void
    // updateQuantity: (id: string, orderQuantity: number) => void
    // deleteItem: (id: string) => void
    // clearCart: () => void
}

type CartStore = CartState & CartActions;

// export const useCartStore = create<CartStore>()(
//     persist(
//         (set, get) => ({
//             items: [],
//             loadingItem: false,
//             thankYouMessage: false,

//             addItem: () => (

//             ),

//             updateQuantity: () => (

//             ),

//             deleteItem: () => (

//             ),

//             clearCart: () => (

//             )
//         }),
//         {
//             name: 'cart-storage'
//         }
//     )
// )

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    loadingItem: false,
    thankYouMessage: false,

    addItem: (item) => set((state) => ({
        items: [
            ...state.items,
            {
                ...item,
                orderQuantity: 1
            }
        ]
    }))
}))