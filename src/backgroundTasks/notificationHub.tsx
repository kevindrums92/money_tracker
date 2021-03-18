import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Transaction } from '../types/transaction';
import moment from 'moment';

export const removeNotification = async (id: number) => {
    try {
        await Notifications.cancelScheduledNotificationAsync(id.toString());
    } catch (error ) {
        console.log(error);   
    }
}

export const setNotification = async (item: Transaction) => {
    if (!item.ShouldNotify) return;
    if (item.Id) await removeNotification(item.Date.getTime());
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

    const title = `${item.Note ? `${item.Category.Name}: ${item.Note}` : item.Category.Name}`
    let type = "";
    switch (item.Category.Type) {
        case "income": type = "ingreso"; break;
        case "expenses": type = "gasto"; break;
        default: type = "ahorro"; break;
    }
    await Notifications.scheduleNotificationAsync({
        identifier: `${itemDate.getTime()}`,
        content: {
            title: title,
            body: `Se agregó el ${type} agendado con valor: "${item.Amount}" que tenías para hoy.`,
            data: item,
        },
        trigger: notificationDate.toDate().getTime(),
    });

}