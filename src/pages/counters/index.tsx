import React from 'react';
import { View, Icon, Text } from '@ray-js/ray';
import styles from './index.module.less';
import { navigateTo } from '@ray-js/ray';
import Strings from '../../i18n';
import { useProps } from '@ray-js/panel-sdk';

export default () => {
    let textCounter: string = Strings.getLang('counter');
    let counterName: string = useProps((props): string => String(props.counter_name));
    let arr = counterName.split('.');

    return (
        <View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-1/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{arr[0]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №1'}</Text>
                    </View>
                </View>
                <View>
                    <Text>000.00 m2</Text>
                </View>
            </View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-2/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{arr[1]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №2'}</Text>
                    </View>
                </View>
                <View>
                    <Text>000.00 m2</Text>
                </View>
            </View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-3/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{arr[2]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №3'}</Text>
                    </View>
                </View>
                <View>
                    <Text>000.00 m2</Text>
                </View>
            </View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-4/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{arr[3]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №4'}</Text>
                    </View>
                </View>
                <View>
                    <Text>000.00 m2</Text>
                </View>
            </View>
        </View>    
    ) 
}
