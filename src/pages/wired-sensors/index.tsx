import React from 'react';
import { View, Text, Input, Switch, PageContainer, Button } from '@ray-js/ray';
import styles from './index.module.less';
import Strings from '../../i18n';
import { useActions, useProps, useDevice } from '@ray-js/panel-sdk';
import wiredSensors from '@/components/wired-sensors';

interface Cmd {
    readonly enableIgnore: number;
    readonly disableIgnore: number;
}

export default () => {
    const ACTIONS: any = useActions();
    const idCodes = useDevice().devInfo.idCodes;
    const cmd: Cmd = {
        enableIgnore:           0x03_00_00_00, // включить игнор аварии датчика
        disableIgnore:          0x04_00_00_00, // отключить игнор аварии датчика
    }
    let multizoneMode: boolean = useProps((props): boolean => Boolean(props.multizone_mode));
    let textZone1: string = Strings.getLang('zone_1'),
        textZone2: string = Strings.getLang('zone_2'),
        textSettings: string = Strings.getLang('settings'),
        textIgnore: string = Strings.getLang('ignore'),
        textSwitchZone: string = Strings.getLang('switch_zone'),
        textNameSensor: string = Strings.getLang('name_sensor'),
        textOk: string = Strings.getLang('ok');

    let [isShow, setIsShow] = React.useState(false);
    let [value, setValue] = React.useState("");
    let [item, setItem]: any = React.useState({});
    let toggleIsShow = () => setIsShow(!isShow); // Показать/скрыть модальное окно

    let sensors = wiredSensors();
    let wiredSensorName1 = useProps((props): string => String(props.wired_sensor_name_1)).split('.');
    let wiredSensorName2 = useProps((props): string => String(props.wired_sensor_name_2)).split('.');

    let indexForDpId = {
        '128': 0, // wiredSensorName1
        '129': 1,
        '130': 2,
        '131': 3,
        '132': 4,
        '133': 5,
        '134': 0, // wiredSensorName2
        '135': 1,
        '136': 2,
        '137': 3,
        '138': 4,
        '139': 5,
    }

    function handleInput(event: any): void
    {
        setValue(event.value);
    }

    function borderColor(item: any): string
    {
        if (item.ignore) {
            return '2px solid darkgray';
        } else if (item.leak) {
            return '2px solid #FF0000';
        }

        return '1px solid white';
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
        name = name.replace(/\./g, '');

        switch (dpIdSensor) {
            case 128:
            case 129:
            case 130:
            case 131:
            case 132:
            case 133:
                wiredSensorName1.splice(indexForDpId[dpIdSensor], 1, name);
                str = wiredSensorName1.join('.');
                ACTIONS.wired_sensor_name_1.set(str);
                break;
            case 134:
            case 135:
            case 136:
            case 137:
            case 138:
            case 139:
                wiredSensorName2.splice(indexForDpId[dpIdSensor], 1, name);
                str = wiredSensorName2.join('.');
                ACTIONS.wired_sensor_name_2.set(str);
                break;
        }
    }

    /**
     * Включить/выключить игнор аварии датчика, режим повышенной безопасности при низком заряде датчика
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


    function viewSensor(item, index)
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
                            <View>
                                <Text className={styles.name}>{ item.name }</Text>
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
                            if (index < 6) {
                                return viewSensor(item, index);
                            }
                        })
                    }
                    <View className={styles.zone}>{textZone2}</View>
                    {
                        sensors.map((item: any, index: number) => {
                            if (index >= 6) {
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
                                onChange={(e) => { enableDisable(e.value, item.id, cmd.enableIgnore, cmd.disableIgnore)}}>
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
