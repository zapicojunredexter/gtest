import { createSelector } from 'reselect';

const notificationsRecord = store => store.notifications;

export const getNotifications = createSelector(
    [notificationsRecord],
    notifications => notifications.notifications,
);
