import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import { submitStep2 } from '../../store/settings';
import { Settings } from '../../types/Settings';
import { accentColor, grayColor } from '../../utils/appColors';
import CustomButton from '../library/CustomButton';

interface SettingUpStep2Props { }

const SettingUpStep2 = (props: SettingUpStep2Props) => {
    const dispatch = useDispatch();
    const { handleSubmit, errors, control, watch } = useForm();
    const values = watch();

    const onSubmit = (data: Settings) => {
        dispatch(submitStep2(data));
    }

    return (
        <View style={{ height: '100%' }}>

            <View style={styles.container}>
                <Text style={styles.titleTextInfo}>Notificaciones</Text>
                <Text style={styles.titleTextDesc}>Te podremos notificar acciones importantes dentro de tu presupuesto.</Text>
            </View>
            {/* //Form */}
            <View style={styles.form}>
                <Controller
                    render={({ value, onChange }) => (
                        <TouchableOpacity style={styles.textFieldContainer}
                            onPress={() => {
                                onChange(!value);
                            }}>
                            <Text style={styles.textFieldLabel}>Notificaciones Diarias</Text>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={{ ...styles.textInputText, flex: 5 }}>Te recordaremos diaríamente de agregar tus registros</Text>
                                <Switch
                                    style={{
                                        alignSelf: 'center',
                                        marginEnd: 10,
                                        flex: 1,
                                    }}
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    name="DailyNotifications"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={true}
                />

                <Controller
                    render={({ value, onChange }) => (
                        <TouchableOpacity style={styles.textFieldContainer}
                            onPress={() => {
                                onChange(!value);
                            }}>
                            <Text style={styles.textFieldLabel}>Notificaciones de registros agendados</Text>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={{ ...styles.textInputText, flex: 5 }}>Te avisaremos cuando un registro agendado sea agregado</Text>
                                <Switch
                                    style={{
                                        alignSelf: 'center',
                                        marginEnd: 10,
                                        flex: 1,
                                    }}
                                    onValueChange={onChange}
                                    value={value}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    name="ScheduledTransactionsNotifications"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={true}
                />

            </View>
            <CustomButton onPress={handleSubmit(onSubmit)} title={"CONTINUAR"} style={styles.submitButton}
                color={"white"} type="default" />

        </View>

    );
};

export default SettingUpStep2;

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
        fontSize: 12
    },
    submitButton: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        paddingHorizontal: 40,
        width: '100%',
    }
});

