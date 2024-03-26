import { useProps, useDevice } from '@ray-js/panel-sdk';

interface Mask {
	readonly registr: number;
	readonly online: number;
	readonly leak: number;
	readonly ignore: number;
	readonly zone: number;
}

export default () => {
	const device = useDevice().dpSchema;
	const idCodes: object = useDevice().devInfo.idCodes;
	const mask: Mask = {
		registr:                0b00000000_00000001_00000000_00000000, // Зарегестрированный датчик
		online:                 0b00000000_00000010_00000000_00000000, // Статус в сети
		leak:                   0b00000000_00000100_00000000_00000000, // Протечка
		ignore:                 0b00000000_00001000_00000000_00000000, // Игнор аварийных состояний
		zone:                   0b00000000_00010000_00000000_00000000, // Зона 1 - 0, Зона 2 - 1
	}

    let wiredSensorName1 = useProps((props): string => String(props.wired_sensor_name_1));
    let wiredSensorName2 = useProps((props): string => String(props.wired_sensor_name_2));
    let wiredSensorNameArr = wiredSensorName1.concat(';', wiredSensorName2).split(';');

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
				zone: Boolean(sensor & mask.zone),
				name: sensorName,
			});
		}

		return sensors;
	}

	return useProps((props: any) => {
		let sensors = [];
		let i = 128; // dpid sensor_1
		let sensorNumber = 0;

		while (i <= 139) {
			let sensorIdentifier: string = idCodes[i];

			if (sensorIdentifier === undefined) {
				break;
			}
			
			// Example: createSensor(Number(props.sensor_1), String(props.sensor_name_1), Number(device.sensor_1.id), sensors, 1);
			createSensor(Number(props[sensorIdentifier]), wiredSensorNameArr[sensorNumber], Number(device[sensorIdentifier].id), sensors, ++sensorNumber);

			i++;
		}

		return sensors;
	});
}

