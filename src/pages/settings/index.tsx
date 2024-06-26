import React from 'react';
import { View, Icon, Text, Switch } from '@ray-js/ray';
import styles from './index.module.less';
import { navigateTo } from '@ray-js/ray';
import Strings from '../../i18n';
import { useActions, useProps } from '@ray-js/panel-sdk';

export default () => {
    const ACTIONS: any = useActions();
    let multizoneMode: boolean = useProps((props): boolean => Boolean(props.multizone_mode));
    let textCounterSettings: string = Strings.getLang('counter_settings'),
        textRadioSensorSettings: string = Strings.getLang('radio_sensor_settings'),
        textWiredSensorSettings: string = Strings.getLang('wired_sensor_settings'),
        textMultizoneMode: string = Strings.getLang('multizone_mode');

    function multizoneModeSwitch(): void
    {
        ACTIONS.multizone_mode.toggle();
    }

    return (
        <View className={styles.settings}>
            <View className={styles.link} 
            >
                <Icon type="icon-checkmark-3" size={30} color="#00BFFF" style={{ position: 'relative', top: '1px' }}></Icon>
                <Text className={styles.linkText}>{textMultizoneMode}</Text>
                <Switch checked={multizoneMode} onChange={multizoneModeSwitch} color="#00BFFF"></Switch>
            </View>
            <View className={styles.link}
                onClick={() => navigateTo({ url: '/pages/wired-sensors/index'})}
            >
                <Icon type="icon-checkmark-1" size={30} color="#00BFFF" style={{ position: 'relative', top: '1px' }}></Icon>
                <Text className={styles.linkText}>{textWiredSensorSettings}</Text>
                <Icon type="icon-right" size={18}></Icon>
            </View>
            <View className={styles.link}
                onClick={() => navigateTo({ url: '/pages/radio-sensors/index'})}
            >
                <Icon type="icon-a-wave3right" size={30} color="#00BFFF" style={{ position: 'relative', top: '1px' }}></Icon>
                <Text className={styles.linkText}>{textRadioSensorSettings}</Text>
                <Icon type="icon-right" size={18}></Icon>
            </View>
            <View className={styles.link} 
                onClick={() => navigateTo({ url: '/pages/counters/index'})}
            >
                <Icon type="icon-timer" size={30} color="#00BFFF" style={{ position: 'relative', top: '1px' }}></Icon>
                <Text className={styles.linkText}>{textCounterSettings}</Text>
                <Icon type="icon-right" size={18}></Icon>
            </View>
            <View className={styles.info} 
                onClick={() => navigateTo({ url: '/pages/info/index'})}
            >
                <Icon type="icon-a-exclamationmarkbubblefill" size={40} color="#00BFFF"></Icon>
                <Text className={styles.textInfo}>Info</Text>
            </View>
        </View>
    );

    
}
