import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartState {
    items: CartItem[]
    loadingItem: boolean
    thankYouMessage: boolean
}

export interface CartActions {
    addItem: (item: Omit<CartItem, 'orderQuantity'>, orderQuantity?: number) => boolean
    updateItem: (id: string, orderQuantity: number, size?: string, colour?: string) => void
    deleteItem: (id: string) => void
    clearCart: () => void
    subtotal: () => number
    totalItems: () => number
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            // States
            items: [],
            loadingItem: false,
            thankYouMessage: false,

            // Actions
            addItem: (item, orderQuantity = 0) => {
                if (!item || orderQuantity <= 0) {
                    return false;
                }

                set((state) => {
                    const existingItem = state.items.find(i => i.id === item.id);

                    if (existingItem) {
                        return {
                            items: state.items.map(i => i.id === item.id ? { 
                                    ...i, 
                                    orderQuantity: i.orderQuantity + orderQuantity
                                } 
                                : i
                        )}
                    };

                    return { 
                        items: [
                            ...state.items, 
                            { ...item, orderQuantity }
                         ] 
                    }
                });

                return true;
            },

            /*************************************************************************************************/

            updateItem: (id, orderQuantity, size, colour) => set((state) => ({
                items: orderQuantity <= 0
                    ? state.items.filter(i => i.id !== id)
                    : state.items.map(i => i.id === id ? {
                        ...i,
                        ...(orderQuantity !== undefined ? { orderQuantity } : {}),
                        ...(size !== undefined ? { size } : {}),
                        ...(colour !== undefined ? { colour } : {})
                    } : i)
            })),

            /*************************************************************************************************/

            deleteItem: (id) => set((state) => ({
                items: state.items.filter(i => i.id !== id)
            })),

            /*************************************************************************************************/

            clearCart: () => set({
                items: []
            }),

            /*************************************************************************************************/

            subtotal: () => {
                const {items} = get();
                return items.reduce((sum, i) => sum + i.orderQuantity * i.unitPrice , 0)
            },

            /*************************************************************************************************/

            totalItems: () => {
                const {items} = get();
                return items.reduce((sum, i) => sum + i.orderQuantity, 0)
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);

   