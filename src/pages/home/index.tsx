import React from 'react';
import { View, Button, Icon, Text } from '@ray-js/ray';
import { navigateTo, vibrateShort, showToast, showModal } from '@ray-js/ray';
import styles from './index.module.less';
import { useActions, useProps, useDevInfo } from '@ray-js/panel-sdk';
import Strings from '../../i18n';

export function Home() {
    const ACTIONS: any = useActions();
    let alarm: boolean = useProps((props): boolean => Boolean(props.alarm));
    let craneCondition1: boolean = useProps((props): boolean => Boolean(props.switch));
    let craneCondition2: boolean = useProps((props): boolean => Boolean(props.switch_2));
    let cleaning: boolean = useProps((props): boolean => Boolean(props.cleaning));
    let multizoneMode: boolean = useProps((props): boolean => Boolean(props.multizone_mode));
    
    let sensorsLeak = [];
    let sensorsSecurityMode = [];
    let textDevice: string = Strings.getLang('device'),
        textAlarm: string = Strings.getLang('alarm'),
        textNotify: string = Strings.getLang('notify'),
        textLowBatteryOrSignal: string = Strings.getLang('lowBatteryOrSignal'),
        textDisableAlarm: string = Strings.getLang('disableAlarm'),
        textSwitchOn: string = Strings.getLang('on'),
        textSwitchOff: string = Strings.getLang('off'),
        textNotifyCleaning: string = Strings.getLang('notifyCleaning'),
        textCleaningModeOn: string = Strings.getLang('cleaningModeOn'),
        textCleaningModeOff: string = Strings.getLang('cleaningModeOff'),
        textButtonCleaning: string = Strings.getLang('cleaning'),
        textRadioSensors: string = Strings.getLang('radioSensors'),
        textCancel: string = Strings.getLang('cancel'),
        textConfirm: string = Strings.getLang('confirm'),
        textContentAlarm: string = Strings.getLang('contentAlarm'),
        textSettings: string = Strings.getLang('settings'),
        textJournal: string = Strings.getLang('journal');

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
                    sensorsLeak = []; 
                    sensorsSecurityMode = [];
                }
            },
        }
    }

    /**
     * Уведомление при низкой батареи или сигнала
     */
    function notifyLowBatteryOrSignal(): object
    {
        if (alarm && (sensorsSecurityMode.length > 0)) {
            return notify(textLowBatteryOrSignal + ' ' + textRadioSensors + ': ' + sensorsLeak.join(', '));
        }
    }

    /**
     * Уведлмление при протечки на определенных датчиках
     */
    function notifyLeak(): object
    {
        if (alarm && (sensorsLeak.length > 0)) {
            return notify(textAlarm + ' ' + textRadioSensors + ': ' + sensorsLeak.join(', '));
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
                        <Text>Zone 1</Text>
                        {blockCraneCondition(craneCondition1)}
                    </View>
                    <View className={styles.zone}
                        onClick={() => { clickCraneCondition('switch_2'); vibrateShort({type: 'heavy'}); vibrateShort({type: 'heavy'});
                    }}>
                        <Text>Zone 2</Text>
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

    return (
        <View className={styles.view}>
            <View className={styles.logo}>
                <Text className={styles.logoText}>{useDevInfo().name}</Text>
            </View>
            <View>
                {notifyDevice()}
                {notifyLeak()}
                {notifyLowBatteryOrSignal()}
                {notifyCleaning()}
                {alarmResetButton()}
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
