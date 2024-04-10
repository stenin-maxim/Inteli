import React from 'react';
import { View, Button, Icon, Text } from '@ray-js/ray';
import { navigateTo, vibrateShort, showToast, showModal } from '@ray-js/ray';
import styles from './index.module.less';
import { useActions, useProps, useDevInfo } from '@ray-js/panel-sdk';
import Strings from '../../i18n';
import {indicatorCounter} from '@/components/counter/indicator-counter';
import radioSensors from '@/components/radio-sensors';

export function Home() {
    const ACTIONS: any = useActions();
    let alarm: boolean = useProps((props): boolean => Boolean(props.alarm));
    let craneCondition1: boolean = useProps((props): boolean => Boolean(props.switch));
    let craneCondition2: boolean = useProps((props): boolean => Boolean(props.switch_2));
    let cleaning: boolean = useProps((props): boolean => Boolean(props.cleaning));
    let multizoneMode: boolean = useProps((props): boolean => Boolean(props.multizone_mode));
    let battery: number = useProps((props): number => Number(props.battery_percentage));
    let counterNames: Array<string> = useProps((props): string => String(props.counter_names)).split(';');
    let counter_1: number = useProps((props): number => Number(props.counter_1)),
        counter_2: number = useProps((props): number => Number(props.counter_2)),
        counter_3: number = useProps((props): number => Number(props.counter_3)),
        counter_4: number = useProps((props): number => Number(props.counter_4));
    let multiplier_1: string = useProps((props): string => String(props.multiplier_1)),
        multiplier_2: string = useProps((props): string => String(props.multiplier_2)),
        multiplier_3: string = useProps((props): string => String(props.multiplier_3)),
        multiplier_4: string = useProps((props): string => String(props.multiplier_4));
    let statusCounter1: boolean = useProps((props): boolean => Boolean(props.status_counter_1)),
        statusCounter2: boolean = useProps((props): boolean => Boolean(props.status_counter_2)),
        statusCounter3: boolean = useProps((props): boolean => Boolean(props.status_counter_3)),
        statusCounter4: boolean = useProps((props): boolean => Boolean(props.status_counter_4));
    let arrRadioSensors: Array<any> = radioSensors();
    let sensorsSafetyMode = [];
    let textBattery: string = Strings.getLang('battery'),
        textDevice: string = Strings.getLang('device'),
        textCharging: string = Strings.getLang('charging'),
        textAlarm: string = Strings.getLang('alarm'),
        textNotify: string = Strings.getLang('notify'),
        textLowBatteryOrSignal: string = Strings.getLang('low_battery_or_signal'),
        textDisableAlarm: string = Strings.getLang('disable_alarm'),
        textSwitchOn: string = Strings.getLang('on'),
        textSwitchOff: string = Strings.getLang('off'),
        textNotifyCleaning: string = Strings.getLang('notify_cleaning'),
        textCleaningModeOn: string = Strings.getLang('cleaning_mode_on'),
        textCleaningModeOff: string = Strings.getLang('cleaning_mode_off'),
        textButtonCleaning: string = Strings.getLang('cleaning'),
        textRadioSensors: string = Strings.getLang('radio_sensors'),
        textCancel: string = Strings.getLang('cancel'),
        textConfirm: string = Strings.getLang('confirm'),
        textContentAlarm: string = Strings.getLang('content_alarm'),
        textSettings: string = Strings.getLang('settings'),
        textJournal: string = Strings.getLang('journal'),
        textZone1: string = Strings.getLang('zone_1'),
        textZone2: string = Strings.getLang('zone_2'),
        textMeter: string = Strings.getLang('meter'),
        textSettingCounter: string = Strings.getLang('setting_counter');

    if (arrRadioSensors.length !== undefined) {
        arrRadioSensors.map((item) => {
            if (!item.ignore && item.safetyMode && item.statusBatterySignal) {
                sensorsSafetyMode.push(item.sensorNumber);
            }
        });
    }

    /**
     * Статус батареи устройства
     * 
     * @returns object
     */
    function colorAndTextBattery(): object
    {
        let color: string = 'black';
        let text: string = textBattery;

        if (battery > 100) {
            text = textCharging;
            color = '#07fa3c';

            return (
                <React.Fragment>
                    <Text className={styles.batteryText}>{text}</Text>
                    <Icon type="icon-a-boltfill" size={35} color={color}></Icon>
                </React.Fragment>
            )
        } else if (battery >= 50 && battery <= 100) {
            color = 'green';
        } else if (battery >= 20 && battery < 50) {
            color = 'orange';
        } else if (battery > 0 && battery < 20) {
            color = 'red';
        }

        return (
            <React.Fragment>
                <Text className={styles.batteryText}>{text}</Text>
                <Icon type="icon-a-boltfill" size={35} color={color}></Icon>
                <Text>{battery}%</Text>
            </React.Fragment>
        )
    }
    
    /**
     * Кнопка выключения аварии
     * 
     * @returns object|false
     */
    function alarmResetButton(): object|false
    {
        if (alarm) {
            return (
                <View className={styles.blockAlarm}>
                    <View className={styles.alarmButton}
                        onClick={() => { showModal(confirm()) }}
                    >
                        <Icon type="icon-cancel" size={35} color="red"></Icon>
                        <Text>{textDisableAlarm}</Text>
                    </View>
                </View>
            );
        }

        return false;
    }

    /**
     * Параметры модального окна при снятии аварии
     * 
     * @returns object
     */
    function confirm(): object
    {
        return {
            title: textDisableAlarm,
            content: textContentAlarm,
            cancelText: textCancel,
            confirmText: textConfirm,
            confirmColor: '#ff0000',
            success: (param: any): void => {
                if (param.confirm) {
                    ACTIONS.alarm.off();
                    sensorsSafetyMode = [];
                }
            },
        }
    }

    /**
     * Уведомление при низкой батареи или сигнала, когда включена авария и режим безопасности датчика  
     */
    function notifyLowBatteryOrSignal(): object
    {
        if (alarm && (sensorsSafetyMode.length > 0)) {
            return notify(textLowBatteryOrSignal + ' ' + textRadioSensors + ': ' + sensorsSafetyMode.join(', '));
        }
    }

    /**
     * Уведомление при аварии
     */
    function notifyAlarm(): object
    {
        if (alarm) {
            return notify(textAlarm);
        }
    }

    /**
     * Уведомление о включении уборки
     * 
     * @returns object|false
     */
    function notifyCleaning(): object|false
    {
        if (cleaning) {
            return notify(textNotifyCleaning);
        }

        return false;
    }

    /**
     * Уведомление о статусе устройства в сети
     * 
     * @returns object
     */
    function notifyDevice(): object
    {
        if (!useDevInfo().isOnline) {
            return notify(textDevice);
        }
    }

    /**
     * Каркас уведомления
     * 
     * @param text string
     * @returns object
     */
    function notify(text: string): object
    {
        return (
            <View className={styles.blockNotify}>
                <Text className={styles.textLeft}>{text}</Text>
                <Text className={styles.textRight}>{textNotify}</Text>
            </View>
        )
    }

    /**
     * Вкл/выкл уборку
     */
    function startStopCleaning(): void
    {
        let text: string;

        if (!cleaning) {
            text = textCleaningModeOn;
            ACTIONS.cleaning.on();
        } else {
            text = textCleaningModeOff;
            ACTIONS.cleaning.off();
        }

        showToast({
            title: text,
            duration: 4000,
        })
    }

    /**
     * Состояние цвета иконки при вкл/выкл уборки
     * 
     * @returns object
     */
    function colorIconCleaning(): object {
        let color: string = '#00BFFF';
        
        if (cleaning) {
            color = 'orange';
        }

        return (
            <Icon type="icon-a-dropfill" size={40} color={color}/>
        )
    }

    function clickCraneCondition(dpSwitch: string): void
    {
        if (!alarm) {
            ACTIONS[dpSwitch].toggle();
        }
    }

    function blockCraneCondition(craneCondition: boolean): object
    {
        if (craneCondition) {
            return (
                <View>
                    <View className={styles.openClose}>
                        <Text className={styles.textSwitch}>{textSwitchOn}</Text>
                    </View>
                    <View className={styles.waves}>
                        <View className={styles.wave1}></View>
                        <View className={styles.wave2}></View>
                    </View>
                </View>
            )
        }

        return (
            <View>
                <View className={styles.openClose}>
                    <Text className={styles.textSwitch}>{textSwitchOff}</Text>
                </View>
                <View className={styles.waves}>
                    <View className={styles.wave3}></View>
                    <View className={styles.wave4}></View>
                </View>
            </View>
        )
    }

    function enableDisableZone()
    {
        if (multizoneMode) {
            return (
                <React.Fragment>
                    <View className={styles.zone}
                        onClick={() => { clickCraneCondition('switch'); vibrateShort({type: 'heavy'}); vibrateShort({type: 'heavy'});
                    }}>
                        <Text>{textZone1}</Text>
                        {blockCraneCondition(craneCondition1)}
                    </View>
                    <View className={styles.zone}
                        onClick={() => { clickCraneCondition('switch_2'); vibrateShort({type: 'heavy'}); vibrateShort({type: 'heavy'});
                    }}>
                        <Text>{textZone2}</Text>
                        {blockCraneCondition(craneCondition2)}
                    </View>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <View onClick={() => { clickCraneCondition('switch'); vibrateShort({type: 'heavy'}); vibrateShort({type: 'heavy'});}}>
                    {blockCraneCondition(craneCondition1)}
                </View>
            </React.Fragment>
        )
    }

    /**
     * Счетчик
     * 
     * @param counter показание счетчика
     * @param multiplier импульс счетчика
     * @param name имя счетчика
     * @returns 
     */
    function counter(counter: number, multiplier: string, name: string): object
    {
        return (
            <View className={styles.displayFlex}>
                <View className={styles.displayFlex}>
                    <Icon type="icon-timer" color="#00BFFF" size={24}/>
                    <Text className={styles.counterText}>{name}</Text>
                </View>
                <View>
                    <Text>{indicatorCounter(counter, multiplier)}</Text>
                    <View className={styles.meterCube}>
                        <Text>{textMeter}</Text>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * Показать счетчики
     * 
     * @returns false|object
     */
    function viewCounters(): false|object
    {
        if (statusCounter1 || statusCounter2 || statusCounter3 || statusCounter4) {
            let objCounter1: object,
                objCounter2: object,
                objCounter3: object,
                objCounter4: object;

            if (statusCounter1) objCounter1 = counter(counter_1, multiplier_1, counterNames[0]);
            if (statusCounter2) objCounter2 = counter(counter_2, multiplier_2, counterNames[1]);
            if (statusCounter3) objCounter3 = counter(counter_3, multiplier_3, counterNames[2]);
            if (statusCounter4) objCounter4 = counter(counter_4, multiplier_4, counterNames[3]);

            return (
                <View className={styles.counters}>
                    {objCounter1}
                    {objCounter2}
                    {objCounter3}
                    {objCounter4}
                    <View
                        className={styles.textSettingCounter}
                        onClick={() => navigateTo({ url: '/pages/counters/index'})}
                    >{textSettingCounter}</View>
                </View>
            )
        }

        return false;
    }

    return (
        <View className={styles.view}>
            <View className={styles.logo}>
                <Text className={styles.logoText}>{useDevInfo().name}</Text>
            </View>
            {viewCounters()}
            <View>
                {notifyDevice()}
                {notifyAlarm()}
                {notifyLowBatteryOrSignal()}
                {notifyCleaning()}
                {alarmResetButton()}
            </View>
            <View className={styles.battery}>
                { colorAndTextBattery() }
            </View>
            <View className={styles.blockCraneCondition}>
                {enableDisableZone()}
            </View>
            <View className={styles.blockFooter}>
                <View className={styles.navButtons}>
                    <Button
                        className={styles.button}
                        onClick={() => { startStopCleaning(); vibrateShort({type: 'heavy'}); vibrateShort({type: 'heavy'}); }}
                    >
                        { colorIconCleaning() }
                        <Text className={styles.textButton}>{textButtonCleaning}</Text>
                    </Button>
                    <Button
                        className={styles.button}
                        onClick={() => navigateTo({ url: '/pages/journal/index'})}
                    >
                        <Icon type="icon-a-scrollfill" size={40}/>
                        <Text className={styles.textButton}>{textJournal}</Text>
                    </Button>
                    <Button
                        className={styles.button}
                        onClick={() => navigateTo({ url: '/pages/settings/index'})}
                    >
                        <Icon type="icon-a-wrenchandscrewdriverfill" size={40}/>
                        <Text className={styles.textButton}>{textSettings}</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default Home;
