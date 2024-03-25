import React from 'react';
import { View, Button, Icon, Text, PageContainer, Input, Switch } from "@ray-js/components";
import styles from './index.module.less';
import { useDevice, useActions, useProps } from '@ray-js/panel-sdk';
import { vibrateShort, showModal } from '@ray-js/ray';
import Strings from '../../i18n';
import radioSensors from '@/components/radio-sensors';

interface Cmd {
    readonly search: number;
    readonly delete: number;
    readonly enableIgnore: number;
    readonly disableIgnore: number;
    readonly enableSecurityMode: number;
    readonly disableSecurityMode: number;
}

export default () => {
    const cmd: Cmd = {
        search:                 0x01_00_00_00, // команда поиск датчика
        delete:                 0x02_00_00_00, // команда удаление датчика
        enableIgnore:           0x03_00_00_00, // включить игнор аварии датчика
        disableIgnore:          0x04_00_00_00, // отключить игнор аварии датчика
        enableSecurityMode:     0x05_00_00_00, // включить режим повышенной безопасности для датчика
        disableSecurityMode:    0x06_00_00_00, // выключить режим повышенной безопасности для датчика
    }

    const actions: any = useActions();
    const idCodes = useDevice().devInfo.idCodes;
    const [isShow, setIsShow] = React.useState(false);
    const [value, setValue] = React.useState("");
    const toggleIsShow = () => setIsShow(!isShow); // Показать/скрыть модальное окно
    const statusSearch: number = useProps((props): number => Number(props.device_cmd));

    let [item, setItem]: any = React.useState({});
    let numberOfSensors: string = Strings.getLang('number_of_sensors'),
        textNotSensors: string = Strings.getLang('not_sensors'),
        textAdd: string = Strings.getLang('add'),
        textAddSensors: string = Strings.getLang('add_sensors'),
        textDeleteSensor: string = Strings.getLang('delete_sensor'),
        textReplaceSensor: string = Strings.getLang('replace_sensor'),
        textNameSensor: string = Strings.getLang('name_sensor'),
        textSettings: string = Strings.getLang('settings'),
        textContentDelete: string = Strings.getLang('content_delete'),
        textContentReplace: string = Strings.getLang('content_replace'),
        textCancel: string = Strings.getLang('cancel'),
        textConfirm: string = Strings.getLang('confirm'),
        textIgnore: string = Strings.getLang('ignore'),
        textSecurityMode: string = Strings.getLang('security_mode'),
        textLowCharge: string = Strings.getLang('low_charge');
    let sensors = radioSensors();
    let countSensors: number = sensors.length == undefined ? 0 : sensors.length;

    console.log(sensors);
    console.log(countSensors);

    function borderColor(item: any): string
    {
        if (item.ignore) {
            return '2px solid darkgray';
        } else if (item.leak) {
            return '2px solid #FF0000';
        } else if (!item.online) {
            return '2px solid #00BFFF';
        } else if (item.battery < 30) {
            return '2px solid orange';
        }

        return '1px solid white';
    }

    function signalColorIcon(type: string, color: string): object
    {
        return (
            <React.Fragment>
                <Icon type={type} color={color} size={26}/>
            </React.Fragment>
        )
    }

    /**
     * Вывод предупреждения, при включенной повышенной опасности и аварии
     * 
     * @param ignore статус игнора - args[0]
     * @param securityMode - статус включения режима повышенной безопасности - args[1]
     * @param statusBatterySignal - статус потери сигнала и низкого заряда - args[2]
     * @returns object
     */
    function alarmSecurityMode(...args: boolean[]): object|void
    {
        if (!args[0] && args[1] && args[2]) {
            return (
                <React.Fragment>
                    <View className={styles.securityMode}>
                        <Icon type="icon-warning" color="red" size={26}/>
                    </View>
                </React.Fragment>
            )
        }
    }

    function batterySensorColorIcon(batterySensor: number): object|void
    {
        if (batterySensor < 30) {
            return (
                <React.Fragment>
                    <View className={styles.battery}>
                        <Icon type="icon-a-boltfill" color="red" size={26}/>
                    </View>
                </React.Fragment>
            )
        }
    }

    /**
     * Вывод текста при добавлении датчика
     * 
     * @return object
     */
    function viewTextAddSensors(): object
    {
        return (
            <React.Fragment>
                <View className={styles.addSensors}>
                    {textAddSensors}
                    <View className={styles.loading}>...</View>
                </View>
            </React.Fragment>
        )
    }

    function showSensors(): object
    {
        return (
            sensors.map((item: any, index: number) => {
                return (
                    <React.Fragment key={index}>
                        <View
                            className={styles.sensor}
                            style={{ border: borderColor(item) }}
                            onClick={() => {
                                toggleIsShow();
                                setValue(item.name);
                                setItem(item);
                            }}
                        >
                            <View className={styles.leftBlockSensor}>
                                <View>
                                    <View className={ item.leak ? styles.sensorNumberAlarm : styles.sensorNumberNorm }>{item.sensorNumber}</View>
                                </View>
                                <View>
                                    <Text className={styles.name}>{ item.name }</Text>
                                </View>
                            </View>
        
                            <View className={styles.signalBattery}>
                                {alarmSecurityMode(item.ignore, item.securityMode, item.statusBatterySignal)}
                                {batterySensorColorIcon(item.battery)}
                                <View className={styles.signal}>
                                    {item.online ? 
                                        signalColorIcon('icon-wifi', 'black') : 
                                        signalColorIcon('icon-a-wifiexclamationmark', '#00BFFF')
                                    }
                                    <Text className={styles.signalText}>{ item.signal }</Text>
                                </View>
                            </View>
                        </View>
                    </React.Fragment>
                )
            })
        )
    }

    return (
        <View>
            <View className={styles.numberOfSensors}>
                <Text className={styles.title}>{ numberOfSensors }</Text>
                <Text className={styles.countSensors}>{ countSensors }</Text>
            </View>
            <View>
                { countSensors ? showSensors() : <React.Fragment><View className={styles.notSensors}>{textNotSensors}</View></React.Fragment> }
            </View>
            <View>
                { statusSearch === cmd.search ? viewTextAddSensors() : '' }
            </View>
            <View className={styles.blockFooter}>
                <Button
                    style={{ padding: '15px' }}
                    onClick={() => { 
                        actions.device_cmd.set(cmd.search); 
                        vibrateShort({type: 'heavy'}); vibrateShort({type: 'heavy'}); 
                    }}>{textAdd}
                </Button>
            </View>
        </View>
    )
}
