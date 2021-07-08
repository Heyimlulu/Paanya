module.exports = (sequelize, DataTypes) => {
    const infraction = sequelize.define('infraction', {
        user: DataTypes.TEXT,
        userID: DataTypes.BIGINT,
        message: DataTypes.TEXT,
        command: DataTypes.TEXT
    }, {
        timestamps: true
    });
    infraction.associate = function(models) {
        // associations can be defined here
    };
    return infraction;
};