import React from 'react';
import { View, Text, Input, Switch, PageContainer, Button } from '@ray-js/ray';
import styles from './index.module.less';
import Strings from '../../i18n';
import { useActions, useProps, useDevice } from '@ray-js/panel-sdk';
import wiredSensors from '@/components/sensors/sensors';
import {cmd, indexForDpId, borderColor} from '@/components/sensors';

export default () => {
    const ACTIONS: any = useActions();
    const idCodes = useDevice().devInfo.idCodes;
    let multizoneMode: boolean = useProps((props): boolean => Boolean(props.multizone_mode)),
        [isShow, setIsShow] = React.useState(false),
        [value, setValue] = React.useState(""),
        [item, setItem]: any = React.useState({}),
        toggleIsShow = () => setIsShow(!isShow), // Показать/скрыть модальное окно
        sensors = wiredSensors('wired'),
        wiredSensorNames1 = useProps((props): string => String(props.wired_sensor_names_1)).split(';'),
        wiredSensorNames2 = useProps((props): string => String(props.wired_sensor_names_2)).split(';');
    let textZone1: string = Strings.getLang('zone_1'),
        textZone2: string = Strings.getLang('zone_2'),
        textSettings: string = Strings.getLang('settings'),
        textIgnore: string = Strings.getLang('ignore'),
        textNameSensor: string = Strings.getLang('name_sensor'),
        textOk: string = Strings.getLang('ok');

    function handleInput(event: any): void
    {
        setValue(event.value);
    }

    /**
     * Изменение имени датчика
     * 
     * @param dpIdSensor - dpid датчика
     * @param name - новое имя датчика
     */
    function editNameSensor(dpIdSensor: number, name: string): void
    {
        let str: string;
        name = name.replace(/\;/g, '');

        if (dpIdSensor >= 129 && dpIdSensor <= 134) {
            wiredSensorNames1.splice(indexForDpId[dpIdSensor], 1, name);
            str = wiredSensorNames1.join(';');
            ACTIONS.wired_sensor_names_1.set(str);
        } else if (dpIdSensor >= 135 && dpIdSensor <= 140) {
            wiredSensorNames2.splice(indexForDpId[dpIdSensor], 1, name);
            str = wiredSensorNames2.join(';');
            ACTIONS.wired_sensor_names_2.set(str);
        }
    }

    /**
     * Включить/выключить игнор аварии датчика
     * 
     * @param value - состояние checkbox
     * @param dpIdSensor - dpid датчика
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

    function viewSensor(item: any, index: number)
    {
        return (
            <React.Fragment key={index}>
                <View className={styles.wrapSensor}>
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
                            <View className={styles.name}>
                                { item.name }
                            </View>
                        </View>
                    </View> 
                </View>
            </React.Fragment>
        )
    }

    function showSensors(): object
    {
        if (multizoneMode) {
            return (
                <View>
                    <View className={styles.zone}>{textZone1}</View>
                    {
                        sensors.map((item: any, index: number) => {
                            if (item.zone1) {
                                return viewSensor(item, index);
                            }
                        })
                    }
                    <View className={styles.zone}>{textZone2}</View>
                    {
                        sensors.map((item: any, index: number) => {
                            if (item.zone2) {
                                return viewSensor(item, index);
                            }
                        })
                    }
                </View>
            )
        }

        return (
            <React.Fragment>
                {
                    sensors.map((item: any, index: number) => {
                        return viewSensor(item, index);
                    })
                }
            </React.Fragment>
        )
    }

    return (
        <View>    
            <View className={styles.sensors}>
                {showSensors()}
            </View>
            <PageContainer show={isShow} position='bottom' onClickOverlay={toggleIsShow} round={true}>
                <View>
                    <View className={styles.headerModalWindow}>
                        {textSettings} <Text>{value}</Text>
                    </View>
                    <View className={styles.checkbox}>
                        <View className={styles.checkboxIgnore}>
                            <Switch type="checkbox" color="#00BFFF" checked={item.ignore}
                                onChange={(e) => { enableDisable(e.value, item.id, cmd.enableIgnore, cmd.disableIgnore) }}>
                                {textIgnore}
                            </Switch>
                        </View>
                    </View>
                    <View className={styles.centerModalWindow}>
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
