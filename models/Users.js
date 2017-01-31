const db = require('./model-base');

module.exports = db.defineModel('users', {
    nickname: {
        type: db.STRING(128),
        allowNull: true
    },
    sex: {
        type: db.INTEGER,
        allowNull: true
    },
    wxlanguage: {
        type: db.STRING(8),
        allowNull: true
    },
    city: {
        type: db.STRING(64),
        allowNull: true
    },
    province: {
        type: db.STRING(64),
        allowNull: true
    },
    country: {
        type: db.STRING(64),
        allowNull: true
    },
    openid: {
        type: db.STRING(128),
        allowNull: true
    },
    unionid: {
        type: db.STRING(128),
        allowNull: true
    },
    groupid: {
        type: db.INTEGER,
        allowNull: true
    },
    subscribe_time: {
        type: db.BIGINT,
        allowNull: true
    },
    subscribe: {
        type: db.INTEGER,
        allowNull: true
    },
    headimgurl: {
        type: db.STRING(256),
        allowNull: true
    },
    remark: {
        type: db.STRING(128),
        allowNull: true
    },
    email: {
        type: db.STRING(128),
        allowNull: true
    },
    mobile: {
        type: db.STRING(32),
        allowNull: true
    },
    passwd: db.STRING(128)
});