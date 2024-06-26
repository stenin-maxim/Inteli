import React from 'react';
import { View, Icon, Text, navigateTo } from '@ray-js/ray';
import styles from './index.module.less';
import Strings from '../../i18n';
import { useProps, useActions } from '@ray-js/panel-sdk';
import { indicatorCounter } from '@/components/counter/indicator-counter';
import { COUNTER_NAMES } from '@/constant';

export default () => {
    const ACTIONS: any = useActions();
    let textCounter: string = Strings.getLang('counter'),
        textMeter: string = Strings.getLang('meter');
    let counter_1: number = useProps((props): number => Number(props.counter_1)),
        counter_2: number = useProps((props): number => Number(props.counter_2)),
        counter_3: number = useProps((props): number => Number(props.counter_3)),
        counter_4: number = useProps((props): number => Number(props.counter_4));
    let multiplier_1: string = useProps((props): string => String(props.multiplier_1)),
        multiplier_2: string = useProps((props): string => String(props.multiplier_2)),
        multiplier_3: string = useProps((props): string => String(props.multiplier_3)),
        multiplier_4: string = useProps((props): string => String(props.multiplier_4));
    let objCounters: Array<any> = [
        [counter_1, multiplier_1],
        [counter_2, multiplier_2],
        [counter_3, multiplier_3],
        [counter_4, multiplier_4],
    ];
    let counterNames: Array<string> = useProps((props): string => {
        props.counter_names === '' && ACTIONS.counter_names.set(COUNTER_NAMES);

        return String(props.counter_names);
    }).split(';');
    
    return (
        <View>
            {
                objCounters.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <View className={styles.counter} onClick={() => navigateTo({ url: `/pages/counter-${index + 1}/index`})}>
                                <View className={styles.counterBlock}>
                                    <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '2px' }}></Icon>
                                    <View className={styles.counterNameText}>
                                        <Text className={styles.counterName}>{counterNames[index]}</Text>
                                        <Text className={styles.counterText}>{textCounter + ` № ${index + 1}`}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className={styles.indicatorCounter}>{ indicatorCounter(item[0], item[1]) }</Text>
                                    <Text>{textMeter}</Text>
                                </View>
                            </View>
                        </React.Fragment>
                    )
                })
            }
        </View>   
    )
}
