"use strict";

const knex = require("../../config/rms.database");
const rmsTransformer = require("../transformers/RmsTransformer");

class RmsController {
  async getItemDataByVpnDepartment(req, res, next) {
    const { vpn, departmentNumber } = req.query;

    return knex
      .select(
        "RMS_StyleGroup.description",
        "RMS_ProductLabel.description as brand",
        "RMS_Sku.StyleGroupID as sgn",
        "RMS_Sku.SkuID"
      )
      .from("RMS_Sku")
      .leftJoin(
        "RMS_StyleGroup",
        "RMS_StyleGroup.StyleGroupID",
        "RMS_Sku.StyleGroupID"
      )
      .leftJoin(
        "RMS_ProductLabel",
        "RMS_ProductLabel.ProductLabelID",
        "RMS_ProductLabel.ProductLabelID"
      )
      .where({
        VendorProductNumber: vpn,
        DepartmentID: departmentNumber
      })
      .limit(1)
      .offset(0)
      .then(response => {
        let data = rmsTransformer.transform(response);
        res.json({
          code: 200,
          message: "Row found",
          row: data
        });
      })
      .catch(error => {
        res.json({
          code: error.errno,
          message: error
        });
      });
  }
}

module.exports = new RmsController();
