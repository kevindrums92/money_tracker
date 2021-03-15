import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Location from 'expo-location';
import moment from 'moment';
import { getCurrentDay, getCurrentMonth, getCurrentYear } from '../utils/date';
import { getScheduledTransactionsReadytoAdd, insertTransactionDB, setScheduledFalseTransactionDB } from '../database/transaction';
import { getNewDateTransactionRecurrency, parseTransactionData } from '../utils/transactionUtils';

const TASKNAME = "scheduled-background-fetch";
const INTERVAL = 60 * 60;

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

                await insertTransactionDB(newItemtoInsert);
            }
        });

    } catch (error) {
        console.log(error);
    }
    return BackgroundFetch.Result.NewData;

}

export const registerScheduledBackgroundTask = async () => {

    TaskManager.defineTask(TASKNAME, bgtask);
    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
        case BackgroundFetch.Status.Restricted:
        case BackgroundFetch.Status.Denied:
            console.log("Background execution is disabled");
            return;

        default: {
            //console.debug("Background execution allowed");

            let tasks = await TaskManager.getRegisteredTasksAsync();
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

            // Location.startLocationUpdatesAsync(TASKNAME, {
            //     accuracy: Location.Accuracy.BestForNavigation,
            //     //timeInterval: LOCATION_TIME_INTERVAL,
            //     //distanceInterval: LOCATION_DISTANCE_INTERVAL,
            //     foregroundService: {
            //         notificationTitle: "test",
            //         notificationBody: "test"
            //     }
            // });
        }
    }
}