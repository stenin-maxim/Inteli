/**
 * Показатель счетчика
 * 
 * @param counter - показатель счетчика
 * @param multiplier - импульс счетчика
 * @returns 
 */
function indicatorCounter(counter: number, multiplier: string): string
{
    let counterMultiplier = counter * Number(multiplier);
    let arr: string[] = String(counterMultiplier).split('');

    if (arr.length - 1 < 3) {
        for (let i = arr.length - 1; arr.length <= 3; i++) {
            arr.unshift('0');
        }
    }

    if (arr.length > 8) {
        arr.splice(0, 1);
    }

    arr.splice(-3, 0, '.');

    return arr.join('');
}

export {
    indicatorCounter
};