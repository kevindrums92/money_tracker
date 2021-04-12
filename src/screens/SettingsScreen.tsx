import { Picker } from '@react-native-community/picker';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Platform, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/library/CustomButton';
import ModalPicker from '../components/library/Input/CustomPicker/ModalPicker';

import { Text, View } from '../components/Themed';
import { RootState } from '../store';
import { SettingsSlice, updateSettings } from '../store/settings';
import { grayColor, accentColor, separatorLineColor, backgroundColor } from '../utils/appColors';
import { getPeriodicities, getStartdayWeek, getStartdayYear, getStartdayMonth } from '../utils/globals';

export default function SettingsScreen() {
  let _textInputName: any = React.createRef();
  const { settings, notifyUpdate } = useSelector<RootState, SettingsSlice>((state) => state.settings);
  if (!settings) {
    return <></>;
  }
  const { Name, Periodicity, Startday }: any = settings?.BudgetObj;
  const { DailyNotifications, ScheduledTransactionsNotifications }: any = settings;
  const dispatch = useDispatch();
  const { handleSubmit, errors, control, watch } = useForm(
    {
      defaultValues: {
        Name,
        Periodicity,
        Startday,
        DailyNotifications,
        ScheduledTransactionsNotifications,
      }
    }
  );
  const values = watch();

  const onSubmit = (data: any) => {
    dispatch(updateSettings(data));
  }

  React.useEffect(() => {
    if (notifyUpdate) {
      Alert.alert("Actualizado Correctamente!");
    }
  }, [notifyUpdate]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Settings */}
        <View style={styles.groupContainer}>
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
        {/* Budget Settings */}
        <View style={styles.groupContainer}>
          <Controller
            render={({ value, onChange }) => (
              <TouchableOpacity style={styles.textFieldContainer}
                onPress={() => {
                  onChange(!value);
                }}>
                <Text style={styles.textFieldLabel}>NOTIFICAR A DIARIO</Text>
                <View style={{
                  flexDirection: 'row',
                  backgroundColor: grayColor
                }}>
                  <Text style={{ ...styles.textInputText, flex: 5, fontSize: 14 }}>Te recordaremos diaríamente de agregar tus registros</Text>
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
            defaultValue={true}
          />

          <Controller
            render={({ value, onChange }) => (
              <TouchableOpacity style={styles.textFieldContainer}
                onPress={() => {
                  onChange(!value);
                }}>
                <Text style={{ ...styles.textFieldLabel }}>NOTIFICAR REGISTROS AGENDADOS</Text>
                <View style={{
                  flexDirection: 'row',
                  backgroundColor: grayColor
                }}>
                  <Text style={{ ...styles.textInputText, flex: 5, fontSize: 14 }}>Te avisaremos cuando un registro agendado sea agregado</Text>
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
            defaultValue={true}
          />
        </View>
      </View>
      <CustomButton onPress={handleSubmit(onSubmit)} title={"GUARDAR"} style={styles.submitButton}
        color={"white"} type="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: backgroundColor
  },
  groupContainer: {
    marginVertical: 10
  },
  form: {
    marginVertical: 0,
    backgroundColor: backgroundColor
  },
  textFieldContainer: {
    backgroundColor: grayColor,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: separatorLineColor
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
    fontSize: 15,
    backgroundColor: grayColor
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    paddingHorizontal: 40,
    width: '100%',
  }
});