import {Notification}  from "../models/index.js";

export const getAllNotifications = async (userId) => {
    const notifications = await Notification.findAll({
        where: {
            user_id: userId
        }
    });
    return notifications;
};

export const getNotificationById = async (userId, notificationId) => {
    const notification = await Notification.findOne({
        where: {
            user_id: userId,
            id: notificationId
        }
    });
    return notification;
};

export const markNotificationAsRead = async (userId, notificationId) => {
    const notification = await Notification.update(
        { is_read: true },
        {
            where: {
                user_id: userId,
                id: notificationId
            }
        }
    );
    return notification;
};

export const deleteNotification = async (userId, notificationId) => {
    const notification = await Notification.destroy({
        where: {
            user_id: userId,
            id: notificationId
        }
    });
    return notification;
};