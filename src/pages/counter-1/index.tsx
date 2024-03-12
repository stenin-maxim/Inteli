import React from 'react';
import { View, Text, RadioGroup, Radio, Label, Input, Button, Switch, Form } from '@ray-js/ray';
import { useProps, useActions } from '@ray-js/panel-sdk';
import styles from '@/pages/counter-1/index.module.less';
import * as counter from '@/components/counter';

export default () => {
    const ACTIONS: any = useActions();
    let counterName: string = useProps((props): string => String(props.counter_name));
    let multiplier1: string = useProps((props): string => String(props.multiplier_1));
    let counter1: number = useProps((props): number => Number(props.counter_1));
    let statusCounter: boolean = useProps((props): boolean => Boolean(props.status_counter_1));
    let [nameCounter, setNameCounter] = React.useState(counterName.split('.')[0]);
    let [valueCounter, setCounter] = React.useState('');
    let viewCounter = counter.viewCounter(counter1, multiplier1);

    function nameInput(event: any): void
    {
        setNameCounter(event.value);
    }

    function counterInput(event: any): void
    {
        setCounter(counter.addPoint(event.value));
    }

    function saveCounter(event: any): void
    {
        let value: number = counter.getCounter(valueCounter, multiplier1);
        let arr: Array<string> = counterName.split('.');
        let str: string;

        if (event.detail.value.name === '') {
            event.detail.value.name = counter.textCounter;
        }

        arr.splice(0, 1, event.detail.value.name);
        str = arr.join('.');

        setCounter('');
        setNameCounter(str);
    
        ACTIONS.counter_name.set(str);
        ACTIONS.multiplier_1.set(event.detail.value.radio);
        ACTIONS.counter_1.set(value);
        ACTIONS.status_counter_1.set(Boolean(event.detail.value.status));
    }

    function viewImpuls(multiplier: string): object
    {
        if (multiplier === '1') {
            return (
                <React.Fragment>
                    <Label>
                        <Radio value="1" color="#00BFFF" checked>{counter.textImpulsLiter}</Radio>
                    </Label>
                    <Label>
                        <Radio value="10" color="#00BFFF">{counter.textImpuls10Liter}</Radio>
                    </Label>
                </React.Fragment>
            )
        } else if (multiplier === '10') {
            return (
                <React.Fragment>
                    <Label>
                        <Radio value="1" color="#00BFFF">{counter.textImpulsLiter}</Radio>
                    </Label>
                    <Label>
                        <Radio value="10" color="#00BFFF" checked>{counter.textImpuls10Liter}</Radio>
                    </Label>
                </React.Fragment>
            )
        }
    }

    return (
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
            <RadioGroup options={[]} className={styles.radioGroup} name="radio">
                {viewImpuls(multiplier1)}
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
    );
}
