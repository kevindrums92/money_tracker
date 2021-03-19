import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Location from 'expo-location';
import moment from 'moment';
import { getCurrentDay, getCurrentMonth, getCurrentYear } from '../utils/date';
import { getScheduledTransactionsReadytoAdd, insertTransactionDB, setScheduledFalseTransactionDB } from '../database/transaction';
import { getNewDateTransactionRecurrency, parseTransactionData } from '../utils/transactionUtils';
import { setNotification } from './notificationHub';
import * as Permissions from 'expo-permissions';

export const TASKNAME = "scheduled-background-fetch";
const INTERVAL = 60*60;

export const bgtask = async () => {
    try {
        const today24h = moment([getCurrentYear, getCurrentMonth - 1, getCurrentDay]).add(1, 'd').toDate();

        const trans = await getScheduledTransactionsReadytoAdd(today24h.getTime());
        const data = parseTransactionData(trans);
        
        data.forEach(async item => {
            const res = await setScheduledFalseTransactionDB(item);

            if (res) {
                const newItemtoInsert = { ...item, Id: undefined };
                const transactionDate = moment(newItemtoInsert.Date);
                newItemtoInsert.Scheduled = true;
                newItemtoInsert.Date = getNewDateTransactionRecurrency(newItemtoInsert.Recurrency, transactionDate);

                const id = await insertTransactionDB(newItemtoInsert);
                setNotification({ ...newItemtoInsert, Id: id });
            }
        });

    } catch (error) {
        console.log(error);
    }
    return BackgroundFetch.Result.NoData;

}

export const registerScheduledBackgroundTask = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.LOCATION);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return;
    }

    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
        case BackgroundFetch.Status.Restricted:
        case BackgroundFetch.Status.Denied:
            console.log("Background execution is disabled");
            return;

        default: {
            //console.debug("Background execution allowed");
            //await BackgroundFetch.unregisterTaskAsync(TASKNAME);
            let tasks = await TaskManager.getRegisteredTasksAsync();
            //console.debug("Registered tasks", tasks);

            if (tasks.find(f => f.taskName === TASKNAME) == null) {
                //console.log("Registering task");
                await BackgroundFetch.registerTaskAsync(TASKNAME);

                tasks = await TaskManager.getRegisteredTasksAsync();
                //console.debug("Registered tasks", tasks);
            } else {
                //console.log(`Task ${TASKNAME} already registered, skipping`);
            }

            //console.log("Setting interval to", INTERVAL);
            await BackgroundFetch.setMinimumIntervalAsync(INTERVAL);

            Location.startLocationUpdatesAsync(TASKNAME, {
                accuracy: Location.Accuracy.High,
                showsBackgroundLocationIndicator:false,
                timeInterval: INTERVAL,
                //distanceInterval: LOCATION_DISTANCE_INTERVAL,
                foregroundService: {
                    notificationTitle: "test",
                    notificationBody: "test"
                }
            });
        }
    }
}