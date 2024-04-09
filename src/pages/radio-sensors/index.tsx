import React from 'react';
import { View, Button, Icon, Text, PageContainer, Input, Switch } from "@ray-js/components";
import styles from './index.module.less';
import { useDevice, useActions, useProps } from '@ray-js/panel-sdk';
import { vibrateShort, showModal } from '@ray-js/ray';
import Strings from '../../i18n';
import radioSensors from '@/components/radio-sensors';
import {cmd, indexForDpId, borderColor} from '@/components/sensors';

export default () => {
    const ACTIONS: any = useActions();
    let idCodes = useDevice().devInfo.idCodes;
    let [isShow, setIsShow] = React.useState(false);
    let [value, setValue] = React.useState("");
    let [item, setItem]: any = React.useState({});
    let toggleIsShow = () => setIsShow(!isShow); // Показать/скрыть модальное окно
    let sensors = radioSensors();
    let countSensors: number = sensors.length == undefined ? 0 : sensors.length;
    let radioSearch = useProps((props): boolean => Boolean(props.radio_search));
    let multizoneMode = useProps((props): boolean => Boolean(props.multizone_mode));
    let radioSensorNames1 = useProps((props): string => String(props.radio_sensor_names_1)).split(';'),
        radioSensorNames2 = useProps((props): string => String(props.radio_sensor_names_2)).split(';'),
        radioSensorNames3 = useProps((props): string => String(props.radio_sensor_names_3)).split(';'),
        radioSensorNames4 = useProps((props): string => String(props.radio_sensor_names_4)).split(';');
    let textNumberOfSensors: string = Strings.getLang('number_of_sensors'),
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
        textSafetyMode: string = Strings.getLang('safety_mode'),
        textOk: string = Strings.getLang('ok'),
        textZoneRadioSensor: string = Strings.getLang('zone_radio_sensor'),
        textZone1: string = Strings.getLang('zone_1'),
        textZone2: string = Strings.getLang('zone_2');

    function handleInput(event: any): void
    {
        setValue(event.value);
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
     * @param safetyMode - статус включения режима повышенной безопасности - args[1]
     * @param statusBatterySignal - статус потери сигнала и низкого заряда - args[2]
     * @returns object
     */
    function alarmSafetyMode(...args: boolean[]): object|void
    {
        if (!args[0] && args[1] && args[2]) {
            return (
                <React.Fragment>
                    <View className={styles.safetyMode}>
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

    /**
     * Параметры модального окна для удаления и замены датчика
     * 
     * @param title
     * @param content
     * @param cmd
     * @returns object
     */
    function confirm(title: string, content: string, cmd: number): object
    {
        return {
            title: title,
            content: content,
            cancelText: textCancel,
            confirmText: textConfirm,
            confirmColor: '#ff0000',
            success: (param: any): void => {
                if (param.confirm) {
                    deleteOrReplaceSensor(item.id, cmd);
                    toggleIsShow();
                }
            },
        }
    }

    /**
     * Удаление и замена датчика
     * 
     * @param sensorId  - dpid sensor
     * @param cmd - команда на удаление или замену
     */
    function deleteOrReplaceSensor(sensorId: number, cmd: number): void
    {
        let name = idCodes[sensorId];

        ACTIONS[name].set(cmd);
    }

    /**
     * Включить/выключить игнор аварии датчика, режим повышенной безопасности при низком заряде датчика, zone1, zone2
     * 
     * @param value - состояние checkbox
     * @param sensorId - dpid датчика
     * @param cmdEnable
     * @param cmdDisable
     */
    function enableDisable(...args: any[]): void
    {
        let name: string = idCodes[args[1]];
        let cmd: number;

        if (args[0]) {
            cmd = args[2];
        } else {
            cmd = args[3];
        }
        ACTIONS[name].set(cmd);
    }

    /**
     * Изменение имени датчика
     * 
     * @param dpIdSensor - dpid датчика
     * @param name - новое имя датчика
     */
    function editNameSensor(dpIdSensor: number, name: string): void|false
    {
        let str: string;
        name = name.replace(/\;/g, '');

        if (dpIdSensor >= 141 && dpIdSensor <= 148) {
            radioSensorNames1.splice(indexForDpId[dpIdSensor], 1, name);
            str = radioSensorNames1.join(';');
            ACTIONS.radio_sensor_names_1.set(str);
        } else if (dpIdSensor >= 149 && dpIdSensor <= 156) {
            radioSensorNames2.splice(indexForDpId[dpIdSensor], 1, name);
            str = radioSensorNames2.join(';');
            ACTIONS.radio_sensor_names_2.set(str);
        } else if (dpIdSensor >= 157 && dpIdSensor <= 164) {
            radioSensorNames3.splice(indexForDpId[dpIdSensor], 1, name);
            str = radioSensorNames3.join(';');
            ACTIONS.radio_sensor_names_3.set(str);
        } else if (dpIdSensor >= 165 && dpIdSensor <= 172) {
            radioSensorNames4.splice(indexForDpId[dpIdSensor], 1, name);
            str = radioSensorNames4.join(';');
            ACTIONS.radio_sensor_names_4.set(str);
        }
    }

    function showZone(): object|false
    {
        if (multizoneMode) {
            return (
                <View className={styles.zone}>
                    <Text className={styles.textModalWindow}>{textZoneRadioSensor}</Text>
                    <View className={styles.checkboxZone}>
                        <Switch type="checkbox" color="#00BFFF" checked={item.zone1}
                            onChange={(e) => { enableDisable(e.value, item.id, cmd.enableZone1, cmd.disableZone1)}}>
                            {textZone1}
                        </Switch>
                        <Switch type="checkbox" color="#00BFFF" checked={item.zone2}
                            onChange={(e) => { enableDisable(e.value, item.id, cmd.enableZone2, cmd.disableZone2)}}>
                            {textZone2}
                        </Switch>
                    </View>
                </View>
            )
        }

        return false
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
                                    {multizoneMode ? 
                                        <>
                                            <View className={styles.textZone}>
                                                { item.zone1 ? <><Text>{textZone1}</Text></> : false}
                                                { item.zone2 ? <><Text>{textZone2}</Text></> : false}
                                            </View>
                                        </>
                                        : false
                                    }
                                </View>
                            </View>
        
                            <View className={styles.signalBattery}>
                                {alarmSafetyMode(item.ignore, item.safetyMode, item.statusBatterySignal)}
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
                <Text className={styles.title}>{ textNumberOfSensors }</Text>
                <Text className={styles.countSensors}>{ countSensors }</Text>
            </View>
            <View>
                { countSensors ? showSensors() : <React.Fragment><View className={styles.notSensors}>{textNotSensors}</View></React.Fragment> }
            </View>
            <View>
                { radioSearch ? viewTextAddSensors() : '' }
            </View>
            <View className={styles.blockFooter}>
                <Button
                    style={{ padding: '15px' }}
                    onClick={() => { 
                        ACTIONS.radio_search.on();
                        vibrateShort({type: 'heavy'}); vibrateShort({type: 'heavy'}); 
                    }}>{textAdd}
                </Button>
            </View>
            <PageContainer show={isShow} position='bottom' onClickOverlay={toggleIsShow} round={true}>
                <View>
                    <View className={styles.headerModalWindow}>                                
                        {textSettings}: <Text>{value}</Text>
                    </View>
                    <View className={styles.checkbox}>
                        <View className={styles.checkboxIgnore}>
                            <Switch type="checkbox" color="#00BFFF" checked={item.ignore}
                                onChange={(e) => { enableDisable(e.value, item.id, cmd.enableIgnore, cmd.disableIgnore)}}>
                                {textIgnore}
                            </Switch>
                        </View>
                        <View>
                            <Switch type="checkbox" color="#00BFFF" checked={item.safetyMode}
                                onChange={(e) => { enableDisable(e.value, item.id, cmd.enableSafetyMode, cmd.disableSafetyMode) }}>
                                {textSafetyMode}
                            </Switch>
                        </View>
                    </View>
                    <View className={styles.centerModalWindow}>
                        <View className={styles.deleteChangeSensor}>
                            <View className={styles.buttonDeleteReplace}
                                onClick={() => { showModal(confirm(textDeleteSensor, textContentDelete, cmd.delete)) }
                            }>
                                <Icon type="icon-a-paintbrushfill" color="red" size={32}></Icon>
                                <Text className={styles.textDeleteChange}>{textDeleteSensor}</Text>
                            </View>
                            <View className={styles.buttonDeleteReplace} 
                                onClick={() => { showModal(confirm(textReplaceSensor, textContentReplace, cmd.search))}}
                            >
                                <Icon type="icon-repeat" color="black" size={32}></Icon>
                                <Text className={styles.textDeleteChange}>{textReplaceSensor}</Text>
                            </View>
                        </View>
                        {showZone()}
                        <View className={styles.inputText}>
                            <Text className={styles.textModalWindow}>{textNameSensor}</Text>
                            <Input
                                className={styles.inputModalWindow}
                                placeholder="Name Sensor"
                                maxLength={24}
                                type="text"
                                value={value}
                                onInput={handleInput}
                            >
                            </Input>
                        </View>
                    </View>
                    <View>
                        <Button
                            className={styles.buttonModalWindow}
                            onClick={() => {
                                toggleIsShow();
                                editNameSensor(item.id, value);
                            }}>{textOk}
                        </Button>
                    </View>
                </View>
            </PageContainer>
        </View>
    )
}
