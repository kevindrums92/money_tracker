import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Transaction } from '../types/transaction';
import moment from 'moment';


export const setNotification = async (item: Transaction) => {
    if (!item.ShouldNotify) return;
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return;
    }
    const itemDate = item.Date;

    const notificationDate = moment([itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()]).add(8, 'h');

    await Notifications.scheduleNotificationAsync({
        identifier: `${item.Id}`,
        content: {
            title: `${item.Note ? item.Note : item.Category.Name}`,
            body: `Se agregó el movimiento agendado con valor: "${item.Amount}" que tenías para hoy.`,
            data: item,
        },
        trigger: notificationDate.toDate().getTime(),
    });

}