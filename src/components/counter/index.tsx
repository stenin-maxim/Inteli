import Strings from '../../i18n';

let textCounter: string = Strings.getLang('counter'),
    textNameCounter: string = Strings.getLang('name_counter'),
    textIndicatorCounter: string = Strings.getLang('indicator_counter'),
    textSettingCounter: string = Strings.getLang('setting_counter'),
    textImpulsLiter: string = Strings.getLang('impuls_liter'),
    textImpuls10Liter: string = Strings.getLang('impuls_10_liter'),
    textStatusCounter: string = Strings.getLang('status_counter'),
    textSave: string = Strings.getLang('save');

/**
 * Добавление точки к числу
 * 
 * @param eventValue 
 * @returns 
 */
function addPoint(eventValue: string): string {
    let arr: string[] = String(eventValue).split('');
    let str: string;

    if (arr.length == 5) {
        arr.push('.');
    }
    str = arr.join('');

    return str;
}

/**
 * Получение параметра счетчика
 * 
 * @param valueCounter 
 * @param multiplier 
 * @returns 
 */
function getCounter(valueCounter: string, multiplier: string): number
{
    let value = valueCounter.replace(".", "");
    let counter: number;

    if (multiplier === '10') {
        counter = Math.round(Number(value) / 10);
    } else {
        counter = Number(value);
    }

    return counter;
}

/**
 * Показать счетчик
 * @param counter - показатель счетчика
 * @param multiplier - импульс счетчика
 * @returns object
 */
function viewCounter(counter: number, multiplier: string): object
{
    let counterMultiplier = counter * Number(multiplier);
    let arr: string[] = String(counterMultiplier).split('');
    let str1: string, str2: string;

    if (arr.length < 8) {
        for (let i = arr.length; i < 8; i++) {
            arr.unshift('0');
        }
    }
    str1 = arr.slice(-8, -3).join('');
    str2 = arr.slice(-3).join('');

    return [str1, str2];
}

export {
    textCounter,
    textNameCounter,
    textIndicatorCounter, 
    textSettingCounter,
    textImpulsLiter,
    textImpuls10Liter,
    textStatusCounter,
    textSave,
    addPoint, 
    getCounter,
    viewCounter,
};
