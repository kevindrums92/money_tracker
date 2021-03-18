import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import CustomButton from '../library/CustomButton';
import CustomCurrencyInput from '../library/Input/CustomCurrencyInput';
import CategoryInput from '../library/Input/category/CategoryInput';
import NoteInput from '../library/Input/NoteInput';
import DateInput from '../library/Input/DateInput';
import { Transaction } from '../../types/transaction';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions, insertTransaction, TransactionSlice } from '../../store/transactions';
import CustomPicker from '../library/Input/CustomPicker/CustomPicker';
import { RootState } from '../../store';
import CustomSwitch from '../library/Input/CustomSwitch';

interface AddTransactionComponentProps {
    setModalVisible: (state: boolean) => void,
    item?: Transaction,
}

const AddTransactionComponent = (props: AddTransactionComponentProps) => {
    const { setModalVisible, item } = props;

    const { handleSubmit, errors, control, watch } = useForm({
        defaultValues: item
    });
    const dispatch = useDispatch();
    const { itemInserted, errorMessage } = useSelector<RootState, TransactionSlice>((state) => state.transactions);

    const values = watch();

    const onSubmit = (data: Transaction) => {
        dispatch(insertTransaction(data));
    }

    React.useEffect(() => {
        if (errorMessage) Alert.alert(errorMessage);
    }, [errorMessage]);

    React.useEffect(() => {
        if (itemInserted)
            setModalVisible(false);
        dispatch(getTransactions());
    }, [itemInserted]);

    const errorTextField = (<Text style={styles.fieldRequired}>Campo requerido</Text>);
    const currentDate = new Date();

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Controller
                    render={({ value, onChange }) => (
                        <CustomCurrencyInput value={value} onChange={onChange} />
                    )}
                    name="Amount"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                />
                {errors.Amount && errorTextField}

                <Controller
                    render={({ value, onChange }) => (
                        <CategoryInput value={value} onChange={onChange} errorField={errors.Category ? errorTextField : <></>} />
                    )}
                    name="Category"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                />

                <Controller
                    render={({ value, onChange }) => (
                        <NoteInput value={value} onChange={onChange} errorField={errors.Note ? errorTextField : <></>} />
                    )}
                    name="Note"
                    control={control}
                    rules={{ required: false }}
                    defaultValue={null}
                />

                <Controller
                    render={({ value, onChange }) => (
                        <DateInput value={value} onChange={onChange} errorField={errors.Date ? errorTextField : <></>} />
                    )}
                    name="Date"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={currentDate}
                />

                <Controller
                    render={({ value, onChange }) => (
                        <CustomPicker value={value} onChange={onChange} errorField={<></>}
                            selectedDate={values.Date} />
                    )}
                    name="Recurrency"
                    control={control}
                    defaultValue={"none"}
                />

                {values.Recurrency !== "none" && <Controller
                    render={({ value, onChange }) => (
                        <CustomSwitch
                            errorField={<></>}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                    name="ShouldNotify"
                    control={control}
                    defaultValue={true}
                />}
            </View>
            { !item && <CustomButton onPress={handleSubmit(onSubmit)} title={item ? "MODIFICAR" : "AGREGAR"} style={styles.customButtonStyle} />
            }
        </View>
    );
};

export default AddTransactionComponent;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        marginTop: 20,
        flexDirection: 'column',

    },
    containerForm: {
        flex: 4,
        alignItems: 'stretch',
    },
    customButtonStyle: {
        flex: 1,
        alignItems: 'stretch',
    },
    fieldRequired: {
        marginTop: 5,
        fontSize: 18,
        fontStyle: 'italic',
        color: 'crimson'
    },
    scrollView: {
        // marginHorizontal: 0,
        // height: '100%',
        // backgroundColor: '#151515'
    },
});