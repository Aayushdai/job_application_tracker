import {getAllNotifications, getNotificationById,markNotificationAsRead, deleteNotification} from "../services/notification.service.js";
export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await getAllNotifications(req.user.id);
        res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};

export const getNotification = async (req, res, next) => {
    try {
        const notificationId = req.params.notificationId;
        const notification = await getNotificationById(req.user.id, notificationId);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }
        res.status(200).json({
            success: true,
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (req, res, next) => {
    try {
        const notificationId = await markNotificationAsRead(req.user.id, req.params.id);
        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            data: notificationId
        });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next)=>{
    try{
        await deleteNotification(req.user.id, req.params.id);
        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });
    }catch(error){
        next(error);
    }
}