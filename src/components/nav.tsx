import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { styled } from 'nativewind';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

export default function Nav() {
    const styles = StyleSheet.create({
        image: {
            width: 125,
            height: 75
        }
    })

    return (
        <SafeAreaView edges={['top']}>
            <View className='bg-sg-locator flex-row items-center justify-between'>
                <View>
                    <Link href="/(tabs)/home">
                        <Image
                            source="https://eu-west-2.graphassets.com/cmk70usra0h7o07mj3leebcq2/cmlo42k6dfhse08mq1tropg00"
                            alt="Secret Garden"
                            contentFit="contain"
                            style={styles.image}
                        />
                    </Link>

                </View>
                <View>
                    <Text className='text-black text-4xl'>Some Tex</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}