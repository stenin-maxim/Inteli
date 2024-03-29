import React from 'react';
import { View, Text, RadioGroup, Input, Button, Switch, Form } from '@ray-js/ray';
import { useProps, useActions } from '@ray-js/panel-sdk';
import styles from '@/pages/counter-1/index.module.less';
import * as counter from '@/components/counter';

export default () => {
    const ACTIONS: any = useActions();
    let counterName: string = useProps((props): string => String(props.counter_name));
    let multiplier_2: string = useProps((props): string => String(props.multiplier_2));
    let counter_2: number = useProps((props): number => Number(props.counter_2));
    let statusCounter: boolean = useProps((props): boolean => Boolean(props.status_counter_2));
    let [nameCounter, setNameCounter] = React.useState(counterName.split(';')[1]);
    let [valueCounter, setCounter] = React.useState('');
    let viewCounter = counter.viewCounter(counter_2, multiplier_2);

    function nameInput(event: any): void
    {
        setNameCounter(event.value);
    }

    function counterInput(event: any): void
    {
        setCounter(counter.addPoint(event.value));
    }

    function saveCounter(event: any): void|false
    {
        let arr: Array<string> = counterName.split(';');
        let value: number;
        let str: string;

        if (event.detail.value.name === '') {
            event.detail.value.name = counter.textCounter;
        }

        arr.splice(1, 1, event.detail.value.name);
        str = arr.join(';');

        setCounter('');
        setNameCounter(event.detail.value.name);
    
        ACTIONS.counter_name.set(str);
        ACTIONS.multiplier_2.set(event.detail.value.radio);
        ACTIONS.status_counter_2.set(Boolean(event.detail.value.status));

        if (!valueCounter) {
            return false;
        }

        value = counter.getCounter(valueCounter, multiplier_2);
        ACTIONS.counter_2.set(value);
    }

    return (
        <View className={styles.counter}>
            <Form onSubmit={saveCounter}>
                <Text className={styles.title}>{counter.textIndicatorCounter}:</Text>
                <View className={styles.indicatorCounter}>
                    <View className={styles.indicatorCounterBlock}>
                        <Text>{viewCounter[0]}</Text>
                        <Text>.</Text>
                        <Text className={styles.threeNumber}>{viewCounter[1]}</Text>
                    </View>
                    <View className={styles.meterCube}>
                        <Text>m</Text>
                        <Text className={styles.cube}>3</Text>
                    </View>
                </View>
                <View className={styles.editCounter}>
                    <Text>{counter.textNameCounter}:</Text>
                    <Input type="text"
                        value={nameCounter}
                        maxLength={40}
                        placeholder='Counter'
                        className={styles.inputNumber}
                        onInput={nameInput}
                        name="name"
                    ></Input>
                </View>
                <Text className={styles.title}>{counter.textSettingCounter}:</Text>
                <RadioGroup className={styles.radioGroup} name="radio">
                    {counter.viewImpuls(multiplier_2)}
                </RadioGroup>
                <View className={styles.statusCounter}>
                    <Text>{counter.textStatusCounter}:</Text>
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
                    <Button className={styles.buttonSave} formType="submit">{counter.textSave}</Button>
                </View>
            </Form>
        </View>
    );
}
