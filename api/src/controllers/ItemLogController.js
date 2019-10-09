"use strict";
const dbConnection = require("../../config/mysql");
const ItemLogTrasformer = require("../transformers/ItemLogTrasformer");

class ItemLogController {
  constructor() {
    this.connection = dbConnection();
    this._itemLogTrasformer = ItemLogTrasformer;
    this.index = this.index.bind(this);
    this.addItemLog = this.addItemLog.bind(this);
  }

  async addItemLog(req, res, next) {
    const { reason } = req.body;
    const { _pk_item_editorial } = req.params;

    console.log(reason);
    console.log(_pk_item_editorial);

    this.connection.query(
      "INSERT INTO log(_fk_item_editorial, lan_id, time_stamp, event, details, user_name) VALUES(' " +
        [_pk_item_editorial] +
        " ',' " +
        Math.random() +
        "',DATE_FORMAT(NOW(), '%Y-%m-%d %T'),' " +
        [reason] +
        "','null','generic_user')",
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err });
        }
        res.status(200).json({
          status: 200,
          massage: "ItemLog Save"
        });
      }
    );
  }

  async index(req, res, next) {
    const { _fk_item_editorial } = req.params;
    // SELECT _fk_item_editorial, user_name, time_stamp,`event`, details FROM fit.log;
    // this.connection.query('SELECT * FROM division WHERE active_fs = 1', (err, result) => {

    // this.connection.query('SELECT _fk_item_editorial, user_name, time_stamp,`event`, details FROM fit.log', (err, result) => {
    this.connection.query(
      "SELECT DATE_FORMAT(log.time_stamp, '%Y-%m-%d %T') as time_stamp, _fk_item_editorial, lan_id, event, user_name, details FROM log WHERE _fk_item_editorial=? ORDER BY time_stamp DESC",
      [_fk_item_editorial],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err });
        }
        res.status(200).json({
          status: 200,
          massage: "ItemLog Found",
          data: this._itemLogTrasformer.transform(result)
        });
      }
    );
  }
}

module.exports = new ItemLogController();
