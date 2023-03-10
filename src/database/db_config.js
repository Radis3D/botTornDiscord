const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database/TornData.sqlite",
  logging: (...msg) => console.log(msg),
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
}); // Example for sqlite

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });

const TornKey = sequelize.define(
  "TornKey",
  {
    dc_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    dc_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torn_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torn_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torn_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const UserKey = sequelize.define(
  "UserKey",
  {
    dc_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    dc_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torn_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torn_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    torn_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Fitness = sequelize.define(
  "FitnessCenter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    
    pos_name: {
      type: DataTypes.STRING,
    },
    pri_name: {
      type: DataTypes.STRING,
    },
    pri_req: {
      type: DataTypes.INTEGER,
    },
    pri_gain: {
      type: DataTypes.INTEGER,
    },

    sec_name: {
      type: DataTypes.STRING,
    },
    sec_req: {
      type: DataTypes.INTEGER,
    },
    sec_gain: {
      type: DataTypes.INTEGER,
    },

    desc: {
      type: DataTypes.STRING,
    },
    special: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

const Rating = sequelize.define(
  "StarRating",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    rating: {
      type: DataTypes.INTEGER,
    },
    gain: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = { TornKey, UserKey, Fitness, Rating };

//console.log(sequelize)
