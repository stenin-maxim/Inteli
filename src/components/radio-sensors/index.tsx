import { useProps, useDevice } from '@ray-js/panel-sdk';

interface Mask {
	readonly registr: number;
	readonly online: number;
	readonly leak: number;
	readonly ignore: number;
	readonly securityMode: number;
}

export default () => {
    const device = useDevice().dpSchema;
	const idCodes: object = useDevice().devInfo.idCodes;
	const mask: Mask = {
		registr:                0b00000000_00000001_00000000_00000000, // Зарегестрированный датчик
		online:                 0b00000000_00000010_00000000_00000000, // Статус в сети
		leak:                   0b00000000_00000100_00000000_00000000, // Протечка
		ignore:                 0b00000000_00001000_00000000_00000000, // Игнор аварийных состояний
        securityMode:           0b00000000_00010000_00000000_00000000, // Режим повышеной безопасности
	}

    let radioSensorName1 = useProps((props): string => String(props.radio_sensor_name_1)),
        radioSensorName2 = useProps((props): string => String(props.radio_sensor_name_2)),
        radioSensorName3 = useProps((props): string => String(props.radio_sensor_name_3)),
        radioSensorName4 = useProps((props): string => String(props.radio_sensor_name_4));
        
    let radioSensor = radioSensorName1.concat(';', radioSensorName2, ';', radioSensorName3, ';', radioSensorName4).split(';');

    console.log(radioSensor);

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
				securityMode: Boolean(sensor & mask.securityMode),
				battery: Number(sensor & 0xFF),
				signal: Number((sensor >> 8) & 0xFF),
				name: sensorName,
			});
		}

		return sensors;
	}

    return useProps((props: any) => {
		let sensors = [];
		let i = 140; // dpid sensor
		let sensorNumber = 0;

		while (i <= 161) {
			let sensorIdentifier: string = idCodes[i];

			if (sensorIdentifier === undefined) {
				break;
			}
			
			createSensor(Number(props[sensorIdentifier]), radioSensor[sensorNumber], Number(device[sensorIdentifier].id), sensors, ++sensorNumber);

			i++;
		}

		return sensors;
	});
}

