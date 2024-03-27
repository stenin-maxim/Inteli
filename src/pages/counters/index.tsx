import React from 'react';
import { View, Icon, Text } from '@ray-js/ray';
import styles from './index.module.less';
import { navigateTo } from '@ray-js/ray';
import Strings from '../../i18n';
import { useProps } from '@ray-js/panel-sdk';

export default () => {
    let textCounter: string = Strings.getLang('counter'),
        textMeter: string = Strings.getLang('meter');
    let counterName: string = useProps((props): string => String(props.counter_name));
    let arr = counterName.split(';');
    let counter_1: number = useProps((props): number => Number(props.counter_1)),
        counter_2: number = useProps((props): number => Number(props.counter_2)),
        counter_3: number = useProps((props): number => Number(props.counter_3)),
        counter_4: number = useProps((props): number => Number(props.counter_4));
    let multiplier_1: string = useProps((props): string => String(props.multiplier_1)),
        multiplier_2: string = useProps((props): string => String(props.multiplier_2)),
        multiplier_3: string = useProps((props): string => String(props.multiplier_3)),
        multiplier_4: string = useProps((props): string => String(props.multiplier_4));

    /**
     * Показатель счетчика
     * 
     * @param counter - показатель счетчика
     * @param multiplier - импульс счетчика
     * @returns 
     */
    function indicatorCounter(counter: number, multiplier: string): string
    {
        let counterMultiplier = counter * Number(multiplier);
        let arr: string[] = String(counterMultiplier).split('');

        if (arr.length - 1 < 3) {
            for (let i = arr.length - 1; arr.length <= 3; i++) {
                arr.unshift('0');
            }
        }

        if (arr.length > 8) {
            arr.splice(0, 1);
        }

        arr.splice(-3, 0, '.');

        return arr.join('');
    }

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
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_1, multiplier_1) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
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
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_2, multiplier_2) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
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
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_3, multiplier_3) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
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
                    <Text className={styles.indicatorCounter}>{ indicatorCounter(counter_4, multiplier_4) }</Text>
                    <Text>{textMeter}</Text>
                    <Text>3</Text>
                </View>
            </View>
        </View>    
    ) 
}
