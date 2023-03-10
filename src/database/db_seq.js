const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db_config.js");


/*
const UserWork = sequelize.define(
  "UserWork",
  {
    id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
    },
    torn_key: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    man: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    int: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    end: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ttl: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const CompanyData = sequelize.define(
  "CompanyData",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torn_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    torn_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    dic: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    work_stats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    settled_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    merits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dir_edu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manager: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addict: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inactive: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_eff: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    man_gain: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    int_gain: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    edu_gain: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  TornKey,
  UserKey,
  UserWork,
  CompanyData
};


module.exports = {
  TornKey, UserKey
};*/