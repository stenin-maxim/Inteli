interface Cmd {
    readonly search: number;
    readonly delete: number;
    readonly enableIgnore: number;
    readonly disableIgnore: number;
    readonly enableSafetyMode: number;
    readonly disableSafetyMode: number;
    readonly enableZone1: number;
    readonly disableZone1: number,
    readonly enableZone2: number,
    readonly disableZone2: number;
}

const cmd: Cmd = {
    search:               0x01_00_00_00, // команда поиск датчика
    delete:               0x02_00_00_00, // команда удаление датчика
    enableIgnore:         0x03_00_00_00, // включить игнор аварии датчика
    disableIgnore:        0x04_00_00_00, // отключить игнор аварии датчика
    enableSafetyMode:     0x05_00_00_00, // включить режим повышенной безопасности для датчика
    disableSafetyMode:    0x06_00_00_00, // выключить режим повышенной безопасности для датчика
    enableZone1:          0x07_00_00_00, // включить zone 1 на датчике
    disableZone1:         0x08_00_00_00, // выключить zone 1 на датчике
    enableZone2:          0x09_00_00_00,
    disableZone2:         0x10_00_00_00,
}
let indexForDpId = {};

for (let i = 129, j = 0; i <= 172; i++, j++) {
    indexForDpId[i] = j;
    
    if (i < 141) {
        if (j === 5) {
            j = -1;
        }
    } else {
        if (j === 7) {
            j = -1;
        }
    }
}

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

export {cmd, indexForDpId, borderColor}










