import { Stack } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { TABS } from '../../../lib/data/tabs';

export default function TabLayout() {

    return (
        <>
            <NativeTabs
                labelVisibilityMode='labeled'
                backgroundColor="#0f342d"
                indicatorColor="#d4e3d3"
                labelStyle={{
                    default: { color: '#fff' },
                    selected: { color: '#d4e3d3' }
                }}
            >
                {TABS.map((i) => (
                    <NativeTabs.Trigger
                        key={i.name}
                        name={i.name}
                        rippleColor="#d4e3d3"
                    >
                        <NativeTabs.Trigger.Icon
                            sf={i.sfIcon}
                            md={i.mdIcon}
                        />
                        <NativeTabs.Trigger.Label>
                            {i.label}
                        </NativeTabs.Trigger.Label>
                    </NativeTabs.Trigger>
                ))}
            </NativeTabs>
        </>
    );
}