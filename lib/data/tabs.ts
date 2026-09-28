import { type AndroidSymbol, type SFSymbol } from 'expo-symbols';

interface TabsProps {
    name: string
    label: string
    sfIcon: SFSymbol
    mdIcon: AndroidSymbol
}

export const TABS: TabsProps[] = [
    {
        name: "home",
        label: "Home",
        sfIcon: "house.fill",
        mdIcon: "home"
    },
    {
        name: "shop",
        label: "Shop",
        sfIcon: "storefront.fill",
        mdIcon: "storefront"
    },
    {
        name: "stores",
        label: "Stores",
        sfIcon: "location.fill",
        mdIcon: "location_pin"
    },
    {
        name: "contact",
        label: "Contact",
        sfIcon: "mail.fill",
        mdIcon: "mail"
    }
];