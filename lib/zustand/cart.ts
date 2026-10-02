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
    updateQuantity: (id: string, orderQuantity: number) => void
    deleteItem: (id: string) => void
    clearCart: () => void
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

            updateQuantity: (id, orderQuantity) => set((state) => ({
                items: orderQuantity <= 0
                    ? state.items.filter(i => i.id !== id)
                    : state.items.map(i => i.id === id ? { ...i, orderQuantity } : i)
            })),

            /*************************************************************************************************/

            deleteItem: (id) => set((state) => ({
                items: state.items.filter(i => i.id !== id)
            })),

            /*************************************************************************************************/

            clearCart: () => set({
                items: []
            })

            /*************************************************************************************************/
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);

   