import React from 'react';
import { View, Text } from '@ray-js/ray';
import styles from './index.module.less';

export default () => {
    return (
        <View className={styles.info}>
            <View className={styles.info}>
                <Text>The author of the application: Stenin Maxim (stenin.site)</Text>
            </View>
            <View className={styles.info}>
                <Text>Year: 2024</Text>
            </View>
        </View>
    );
}

