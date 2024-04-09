import { useProps, useDevice, useActions } from '@ray-js/panel-sdk';
import {RADIO_SENSOR_NAMES_1, RADIO_SENSOR_NAMES_2, RADIO_SENSOR_NAMES_3, RADIO_SENSOR_NAMES_4} from '@/constant';

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

export default () => {
	const ACTIONS: any = useActions();
    const device = useDevice().dpSchema;
	const idCodes: object = useDevice().devInfo.idCodes;
	const mask: Mask = {
		registr:                0b00000000_00000001_00000000_00000000, // Зарегестрированный датчик
		online:                 0b00000000_00000010_00000000_00000000, // Статус в сети
		leak:                   0b00000000_00000100_00000000_00000000, // Протечка
		ignore:                 0b00000000_00001000_00000000_00000000, // Игнор аварийных состояний
        safetyMode:           	0b00000000_00010000_00000000_00000000, // Режим повышеной безопасности safetyMode
		statusBatterySignal:    0b00000000_00100000_00000000_00000000, // Зарегистрировано аварийное состояние датчика - потеря сигнала, низкий заряд
		zone1: 					0b00000000_01000000_00000000_00000000, // Включена zone 1
		zone2:					0b00000000_10000000_00000000_00000000, // Включена zone 2
	}

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

    let radioSensorNames1 = sensorNames('radio_sensor_names_1', RADIO_SENSOR_NAMES_1),
        radioSensorNames2 = sensorNames('radio_sensor_names_2', RADIO_SENSOR_NAMES_2),
        radioSensorNames3 = sensorNames('radio_sensor_names_3', RADIO_SENSOR_NAMES_3),
        radioSensorNames4 = sensorNames('radio_sensor_names_4', RADIO_SENSOR_NAMES_4);
        
    let radioSensorNamesArr = radioSensorNames1.concat(';', radioSensorNames2, ';', radioSensorNames3, ';', radioSensorNames4).split(';');

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
		if (Boolean(sensor & mask.registr)) {
			sensors.push({
				id: sensorId,
				sensorNumber: sensorNumber,
				registr: Boolean(sensor & mask.registr),
				online: Boolean(sensor & mask.online),
				leak: Boolean(sensor & mask.leak),
				ignore: Boolean(sensor & mask.ignore),
				safetyMode: Boolean(sensor & mask.safetyMode),
				statusBatterySignal: Boolean(sensor & mask.statusBatterySignal),
				zone1: Boolean(sensor & mask.zone1),
				zone2: Boolean(sensor & mask.zone2),
				battery: Number(sensor & 0xFF),
				signal: Number((sensor >> 8) & 0xFF),
				name: sensorName,
			});
		}

		return sensors;
	}

    return useProps((props: any) => {
		let sensors = [];
		let i = 141; // dpid sensor
		let sensorNumber = 0;

		while (i <= 172) {
			let sensorIdentifier: string = idCodes[i];

			if (sensorIdentifier === undefined) {
				break;
			}
			
			createSensor(Number(props[sensorIdentifier]), radioSensorNamesArr[sensorNumber], Number(device[sensorIdentifier].id), sensors, ++sensorNumber);

			i++;
		}

		return sensors;
	});
}

