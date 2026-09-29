import User from "./User.js";
import Company from "./Company.js";
import Application from "./Application.js";
import Interview from "./Interview.js";
import Document from "./Document.js";
import FollowUp from "./FollowUp.js";
import Notification from "./Notification.js";
User.hasMany(Application, {
    foreignKey: "user_id",
    as: "applications"
});

Application.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

Company.hasMany(Application, {
    foreignKey: "company_id",
    as: "applications"
});

Application.belongsTo(Company, {
    foreignKey: "company_id",
    as: "company"
});

Application.hasMany(Interview, {
    foreignKey: "application_id",
    as: "interviews"
});

Interview.belongsTo(Application, {
    foreignKey: "application_id",
    as: "application"
});
User.hasMany(Document, {
    foreignKey: "user_id",
    as: "documents"
});

Document.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

Application.hasMany(Document, {
    foreignKey: "application_id",
    as: "documents"
});

Document.belongsTo(Application, {
    foreignKey: "application_id",
    as: "application"
});
Application.hasMany(FollowUp, {
    foreignKey: "application_id",
    as: "followUps"
});
FollowUp.belongsTo(Application, {
    foreignKey: "application_id",
    as: "application"
});
User.hasMany(Notification, {
    foreignKey: "user_id",
    as: "notifications"
});
Notification.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

export {
    User,
    Company,
    Application,
    Interview,
    FollowUp,
    Document,
    Notification

};