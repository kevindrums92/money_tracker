import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { submitStep1 } from '../../store/settings';
import { Budget } from '../../types/Settings';
import { accentColor, grayColor } from '../../utils/appColors';
import { getPeriodicities, getStartdayWeek, getStartdayYear, getStartdayMonth } from '../../utils/globals';
import CustomButton from '../library/CustomButton';
import ModalPicker from '../library/Input/CustomPicker/ModalPicker';
import { Picker } from "@react-native-community/picker";

interface SettingUpStep1Props { }

const SettingUpStep1 = (props: SettingUpStep1Props) => {
    let _textInputName: any = React.createRef();
    const dispatch = useDispatch();
    const { handleSubmit, errors, control, watch } = useForm();
    const values = watch();

    const onSubmit = (data: Budget) => {
        dispatch(submitStep1(data));
    }

    return (
        <View style={{ height: '100%' }}>

            <View style={styles.container}>
                <Text style={styles.titleTextInfo}>Tu primer presupuesto</Text>
                <Text style={styles.titleTextDesc}>Vamos a crear tu primer presupuesto. Tu puedes continuar y customizarlo luego.</Text>
            </View>
            {/* //Form */}
            <View style={styles.form}>
                <Controller
                    render={({ value, onChange }) => (
                        <TouchableOpacity style={styles.textFieldContainer}
                            onPress={() => {
                                _textInputName.focus();
                            }}>
                            <Text style={styles.textFieldLabel}>NOMBRE</Text>
                            <TextInput
                                ref={(ref) => {
                                    _textInputName = ref;
                                }}
                                style={styles.textInputText}
                                onChangeText={onChange}
                                value={value}
                            />
                        </TouchableOpacity>
                    )}
                    name="Name"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={"Mi presupuesto"}
                />

                <Controller
                    render={({ value, onChange }) => {
                        const [isPickerVisible, setIsPickerVisible] = React.useState(false);

                        return (
                            <TouchableOpacity style={styles.textFieldContainer}
                                onPress={() => {
                                    setIsPickerVisible(true);
                                }}>
                                <Text style={styles.textFieldLabel}>PERIODICIDAD</Text>

                                {Platform.OS === 'ios' && <>
                                    <View>
                                        <Text style={styles.textInputText}>{getPeriodicities.find(i => i[1] === value)?.[0]}</Text>
                                    </View>
                                    <ModalPicker value={value} onChange={onChange} modalVisible={isPickerVisible} closeControl={() => {
                                        setIsPickerVisible(false);
                                    }} options={getPeriodicities} />
                                </>}
                                {Platform.OS === 'android' && <Picker
                                    style={{
                                        color: 'white',
                                    }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    itemStyle={{ color: "white" }}
                                >
                                    {getPeriodicities.map((i: any, index: any) => {
                                        return <Picker.Item key={index} label={i[0]} value={i[1]} />;
                                    })}
                                </Picker>}
                            </TouchableOpacity>
                        )
                    }}
                    name="Periodicity"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={"monthly"}
                />

                <Controller
                    render={({ value, onChange }) => {
                        const [isPickerVisible, setIsPickerVisible] = React.useState(false);

                        let list: any;
                        switch (values.Periodicity) {
                            case "weekly":
                                list = getStartdayWeek;
                                break;
                            case "yearly":
                                list = getStartdayYear;
                                break;
                            case "monthly":
                            default:
                                list = getStartdayMonth;
                                break;
                        }
                        return (
                            <TouchableOpacity style={styles.textFieldContainer}
                                onPress={() => {
                                    setIsPickerVisible(true);
                                }}>
                                <Text style={styles.textFieldLabel}>DÍA DE INICIO DEl PERIODO</Text>

                                {Platform.OS === 'ios' && <>
                                    <View>
                                        <Text style={styles.textInputText}>{list.find((i: any) => i[1] === value)?.[0]}</Text>
                                    </View>
                                    <ModalPicker value={value} onChange={onChange} modalVisible={isPickerVisible} closeControl={() => {
                                        setIsPickerVisible(false);
                                    }} options={list} />
                                </>}

                                {Platform.OS === 'android' && <Picker
                                    style={{
                                        color: 'white',
                                    }}
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    itemStyle={{ color: "white" }}
                                >
                                    {list.map((i: any, index: any) => {
                                        return <Picker.Item key={index} label={i[0]} value={i[1]} />;
                                    })}
                                </Picker>}

                            </TouchableOpacity>
                        )
                    }}
                    name="Startday"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={1}
                />

            </View>
            <CustomButton onPress={handleSubmit(onSubmit)} title={"CONTINUAR"} style={styles.submitButton}
                color={"white"} type="default" />

        </View>

    );
};

export default SettingUpStep1;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 30,
        //height:'100%'
    },
    titleTextInfo: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleTextDesc: {
        color: 'white',
        fontSize: 14,
        marginHorizontal: 40,
        textAlign: 'center',
    },
    form: {
        marginVertical: 20,
        marginHorizontal: 40,
    },
    textFieldContainer: {
        backgroundColor: grayColor,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20,
        marginVertical: 10
    },
    textFieldLabel: {
        color: accentColor,
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 2
    },
    textInputText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15
    },
    submitButton: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        paddingHorizontal: 40,
        width: '100%',
    }
});

