import { useProps, useDevice, useActions } from '@ray-js/panel-sdk';
import {WIRED_SENSOR_NAMES_1, WIRED_SENSOR_NAMES_2, RADIO_SENSOR_NAMES_1, RADIO_SENSOR_NAMES_2, RADIO_SENSOR_NAMES_3, RADIO_SENSOR_NAMES_4} from '@/constant';

interface Mask {
	readonly registr: number;
	readonly online: number;
	readonly leak: number;
	readonly ignore: number;
	readonly safetyMode: number;
	readonly statusBatterySignal: number;
	readonly zone1: number;
	readonly zone2: number;
}

export default (sensorType: string) => {
	const ACTIONS: any = useActions();
    const device: object = useDevice().dpSchema;
	const idCodes: object = useDevice().devInfo.idCodes;
	const MASK: Mask = {
		registr:                0b00000000_00000001_00000000_00000000, // Зарегестрированный датчик
		online:                 0b00000000_00000010_00000000_00000000, // Статус в сети
		leak:                   0b00000000_00000100_00000000_00000000, // Протечка
		ignore:                 0b00000000_00001000_00000000_00000000, // Игнор аварийных состояний
        safetyMode:           	0b00000000_00010000_00000000_00000000, // Режим повышеной безопасности safetyMode
		statusBatterySignal:    0b00000000_00100000_00000000_00000000, // Зарегистрировано аварийное состояние датчика - потеря сигнала, низкий заряд
		zone1: 					0b00000000_01000000_00000000_00000000, // Включена zone 1
		zone2:					0b00000000_10000000_00000000_00000000, // Включена zone 2
	}

    let wiredSensorNames1: string = sensorNames('wired_sensor_names_1', WIRED_SENSOR_NAMES_1),
        wiredSensorNames2: string = sensorNames('wired_sensor_names_2', WIRED_SENSOR_NAMES_2),
        radioSensorNames1: string = sensorNames('radio_sensor_names_1', RADIO_SENSOR_NAMES_1),
        radioSensorNames2: string = sensorNames('radio_sensor_names_2', RADIO_SENSOR_NAMES_2),
        radioSensorNames3: string = sensorNames('radio_sensor_names_3', RADIO_SENSOR_NAMES_3),
        radioSensorNames4: string = sensorNames('radio_sensor_names_4', RADIO_SENSOR_NAMES_4);

    let wiredSensorNamesArr: Array<string> = wiredSensorNames1.concat(';', wiredSensorNames2).split(';'),
    	radioSensorNamesArr: Array<string> = radioSensorNames1.concat(';', radioSensorNames2, ';', radioSensorNames3, ';', radioSensorNames4).split(';');

	function sensorNames(identifier: string, str: string): string
	{
		return useProps((props): string => {
			if (props[identifier] === '') {
				ACTIONS[identifier].set(str);
				return str;
			} 

			return props[identifier];
		})
	}

    /**
	* Создание датчика с параметрами
	* 
	* @param sensor - датчик с параметрами, в числовом типе
	* @param sensorName - имя датчика  
	* @param sensorId - dpid датчика 
	* @param sensors - массив датчиков
	* @param sensorNumber - порядковый номер датчика
	* @returns object[]
	*/
	function createSensor(sensor: number, sensorName: string, sensorId: number, sensors: object[], sensorNumber: number): object[]
	{
		if (Boolean(sensor & MASK.registr)) {
			if (sensorType === 'wired') {
				sensors.push({
					id: sensorId,
					sensorNumber: sensorNumber,
					registr: Boolean(sensor & MASK.registr),
					online: Boolean(sensor & MASK.online),
					leak: Boolean(sensor & MASK.leak),
					ignore: Boolean(sensor & MASK.ignore),
					zone1: Boolean(sensor & MASK.zone1),
					zone2: Boolean(sensor & MASK.zone2),
					name: sensorName,
				});
			}

			if (sensorType === 'radio') {
				sensors.push({
					id: sensorId,
					sensorNumber: sensorNumber,
					registr: Boolean(sensor & MASK.registr),
					online: Boolean(sensor & MASK.online),
					leak: Boolean(sensor & MASK.leak),
					ignore: Boolean(sensor & MASK.ignore),
					zone1: Boolean(sensor & MASK.zone1),
					zone2: Boolean(sensor & MASK.zone2),
					safetyMode: Boolean(sensor & MASK.safetyMode),
					statusBatterySignal: Boolean(sensor & MASK.statusBatterySignal),
					battery: Number(sensor & 0xFF),
					signal: Number((sensor >> 8) & 0xFF),
					name: sensorName,
				});
			}
		}

		return sensors;
	}

    return useProps((props: any) => {
		let i: number = 0, 
			endDpId: number = 0,
			sensors: Array<object> = [],
			sensorNumber: number = 0,
			sensorNamesArr: Array<string>;

		if (sensorType === 'wired') {
			sensorNamesArr = wiredSensorNamesArr;
			i = 129,
			endDpId = 140;
		} 
		
		if (sensorType === 'radio') {
			sensorNamesArr = radioSensorNamesArr;
			i = 141,
			endDpId = 172;
		}

		while (i <= endDpId) {
			let sensorIdentifier: string = idCodes[i];

			if (sensorIdentifier === undefined) {
				break;
			}
			
			createSensor(Number(props[sensorIdentifier]), sensorNamesArr[sensorNumber], Number(device[sensorIdentifier].id), sensors, ++sensorNumber);

			i++;
		}

		return sensors;
	});
}

