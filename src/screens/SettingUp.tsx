import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DismissKeyboard from '../components/library/DismissKeyboard';
import SettingUpStep1 from '../components/Settingup/SettingUpStep1';
import SettingUpStep2 from '../components/Settingup/SettingUpStep2';
import { RootState } from '../store';
import { getSettings, SettingsSlice } from '../store/settings';
import { accentColor, grayColor } from '../utils/appColors';

const renderStepIndicator = (step: number) => {

    return <View style={styles.stepIndicatorContainer}>
        <View style={{
            ...styles.stepIndicatorItem,
            backgroundColor: (step >= 1) ? accentColor : grayColor
        }}></View>
        <View style={{
            ...styles.stepIndicatorItem,
            backgroundColor: (step >= 2) ? accentColor : grayColor
        }}></View>
    </View>;
}

interface SettingUpProps {
    navigation: any;
 }

const SettingUp = ({navigation}: SettingUpProps) => {
    const dispatch = useDispatch();

    const { step, settings, loading } = useSelector<RootState, SettingsSlice>((state) => state.settings);
    React.useEffect(()=>{
        if(settings?.WelcomeComplete)
            {
                navigation.navigate('Root');
            }
    },[settings]);
    
    if(loading){
        return (<View>
            <Text>Loading</Text>
        </View>);
    }

    return (
        <DismissKeyboard>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.titleText}>Comencemos!</Text>
                    <Text style={styles.titleStepIndicTitle}>PASO {step} / 2</Text>
                    {renderStepIndicator(step)}
                </View>
                {/* Content */}
                <View style={styles.formContent}>
                    {step === 1 && <SettingUpStep1 />}
                    {step === 2 && <SettingUpStep2 />}
                </View>

            </SafeAreaView>
        </DismissKeyboard>

    );
};

export default SettingUp;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 6
    },
    headerContainer: {
        alignItems: 'center',
        flex: 1
    },
    formContent: {
        flex: 5
    },
    titleText: {
        color: 'white',
        fontSize: 16
    },
    titleStepIndicTitle: {
        color: accentColor,
        fontSize: 12,
        fontWeight: '800'
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        height: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    stepIndicatorItem: {
        backgroundColor: grayColor,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 10
    },
});
