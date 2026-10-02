import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

export interface AccordionProps {
    title: string
    desc: string
    icon: LucideIcon
}

export function ProductAccordion({ data }: { data: AccordionProps[] }) {
    return (
        <View>
            <Accordion type='single' collapsable>
                {data.map((i, index) => (
                    <AccordionItem key={i.title} value={`item-${index}`}>
                        <AccordionTrigger>
                            <View className='flex-row items-center gap-4'>
                                <Text>
                                    {i.icon ? <i.icon size={20} /> : null}
                                </Text>
                                <Text className='text-xl font-ls-bold text-sg-green'>
                                    {i.title}
                                </Text>
                            </View>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Text className='py-2 text-lg leading-tight font-ls-medium'>
                                {i.desc}
                            </Text>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </View>
    )
}