const Sequelize = require('sequelize')
const Database = require('../database/database')

const Transactions = Database.define('transactions', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  telegramId: {
    allowNull: false,
    type: Sequelize.STRING(15)
  },
  gateway_txn_id:{
    allowNull: true,
    type: Sequelize.STRING(255)
  },
  bzlAddress: {
    allowNull: false,
    type: Sequelize.STRING(40)
  },
  addresstopay: {
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  amountUsd: {
    allowNull: false,
    type: Sequelize.STRING
  },
  amountBzl: {
    allowNull: false,
    type: Sequelize.STRING
  },
  amounttopay: {
    allowNull: true,
    type: Sequelize.STRING
  },
  currency1:{
    allowNull: false,
    type: Sequelize.STRING
  },
  currency2:{
    allowNull: false,
    type:Sequelize.STRING
  },
  status:{
    allowNull: false,
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  confirms_needed:{
    allowNull: true,
    type: Sequelize.INTEGER
  },
  timeout:{
    allowNull: true,
    type: Sequelize.INTEGER
  },
  send:{
    allowNull: true,
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  txid:{
    allowNull: true,
    type: Sequelize.STRING
  }
})

module.exports = Transactions