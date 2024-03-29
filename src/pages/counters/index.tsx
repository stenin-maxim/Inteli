import React from 'react';
import { View, Icon, Text } from '@ray-js/ray';
import styles from './index.module.less';
import { navigateTo } from '@ray-js/ray';
import Strings from '../../i18n';
import { useProps } from '@ray-js/panel-sdk';
import {indicatorCounter} from '@/components/counter/indicator-counter';

export default () => {
    let textCounter: string = Strings.getLang('counter'),
        textMeter: string = Strings.getLang('meter');
    let counterName: Array<string> = useProps((props): string => String(props.counter_name)).split(';');
    let counter_1: number = useProps((props): number => Number(props.counter_1)),
        counter_2: number = useProps((props): number => Number(props.counter_2)),
        counter_3: number = useProps((props): number => Number(props.counter_3)),
        counter_4: number = useProps((props): number => Number(props.counter_4));
    let multiplier_1: string = useProps((props): string => String(props.multiplier_1)),
        multiplier_2: string = useProps((props): string => String(props.multiplier_2)),
        multiplier_3: string = useProps((props): string => String(props.multiplier_3)),
        multiplier_4: string = useProps((props): string => String(props.multiplier_4));

    return (
        <View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-1/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{counterName[0]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №1'}</Text>
                    </View>
                </View>
                <View>
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_1, multiplier_1) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
                </View>
            </View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-2/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{counterName[1]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №2'}</Text>
                    </View>
                </View>
                <View>
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_2, multiplier_2) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
                </View>
            </View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-3/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{counterName[2]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №3'}</Text>
                    </View>
                </View>
                <View>
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_3, multiplier_3) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
                </View>
            </View>
            <View className={styles.counter} onClick={() => navigateTo({ url: '/pages/counter-4/index'})}>
                <View className={styles.counterBlock}>
                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                    <View className={styles.counterNameText}>
                        <Text>{counterName[3]}</Text>
                        <Text className={styles.counterText}>{textCounter + ' №4'}</Text>
                    </View>
                </View>
                <View>
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_4, multiplier_4) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
                </View>
            </View>
        </View>    
    ) 
}
