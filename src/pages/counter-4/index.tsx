import React from 'react';
import { View, Text, RadioGroup, Input, Button, Switch, Form } from '@ray-js/ray';
import { useProps, useActions } from '@ray-js/panel-sdk';
import styles from '@/pages/counter-1/index.module.less';
import * as componentCounter from '@/components/counter';

export default () => {
    const ACTIONS: any = useActions();
    let counterNames: string = useProps((props): string => String(props.counter_names));
    let multiplier: string = useProps((props): string => String(props.multiplier_4));
    let counter: number = useProps((props): number => Number(props.counter_4));
    let statusCounter: boolean = useProps((props): boolean => Boolean(props.status_counter_4));
    let [nameCounter, setNameCounter] = React.useState(counterNames.split(';')[3]);
    let [valueCounter, setCounter] = React.useState('');
    let viewCounter = componentCounter.viewCounter(counter, multiplier);

    function nameInput(event: any): void
    {
        setNameCounter(event.value);
    }

    function counterInput(event: any): void
    {
        setCounter(componentCounter.addPoint(event.value));
    }

    function saveCounter(event: any): void|false
    {
        let arr: Array<string> = counterNames.split(';');
        let value: number;
        let str: string;

        if (event.detail.value.name === '') {
            event.detail.value.name = componentCounter.textCounter;
        }

        arr.splice(3, 1, event.detail.value.name);
        str = arr.join(';');

        setCounter('');
        setNameCounter(event.detail.value.name);
    
        ACTIONS.counter_names.set(str);
        ACTIONS.multiplier_4.set(event.detail.value.radio);
        ACTIONS.status_counter_4.set(Boolean(event.detail.value.status));

        if (!valueCounter) {
            return false;
        }

        value = componentCounter.getCounter(valueCounter, multiplier);
        ACTIONS.counter_4.set(value);
    }

    return (
        <View className={styles.counter}>
            <Form onSubmit={saveCounter}>
                <Text className={styles.title}>{componentCounter.textIndicatorCounter}:</Text>
                <View className={styles.indicatorCounter}>
                    <View className={styles.indicatorCounterBlock}>
                        <Text>{viewCounter[0]}</Text>
                        <Text>.</Text>
                        <Text className={styles.threeNumber}>{viewCounter[1]}</Text>
                    </View>
                    <View className={styles.meterCube}>
                        <Text>{componentCounter.textMeter}</Text>
                    </View>
                </View>
                <View className={styles.editCounter}>
                    <Text>{componentCounter.textNameCounter}:</Text>
                    <Input type="text"
                        value={nameCounter}
                        maxLength={30}
                        placeholder={componentCounter.textNameCounter}
                        className={styles.inputNumber}
                        onInput={nameInput}
                        name="name"
                    ></Input>
                </View>
                <Text className={styles.title}>{componentCounter.textSettingCounter}:</Text>
                <RadioGroup className={styles.radioGroup} name="radio">
                    {componentCounter.viewImpuls(multiplier)}
                </RadioGroup>
                <View className={styles.statusCounter}>
                    <Text>{componentCounter.textStatusCounter}:</Text>
                    <Switch name="status" checked={statusCounter}></Switch>
                </View>
                <View className={styles.editCounter}>
                    <Input type="digit"
                        value={valueCounter}
                        maxLength={9}
                        placeholder="00000.000"
                        className={styles.inputNumber}
                        onInput={counterInput}
                        name="counter"
                    ></Input>
                    <Button className={styles.buttonSave} formType="submit">{componentCounter.textSave}</Button>
                </View>
            </Form>
        </View>
    );
}
