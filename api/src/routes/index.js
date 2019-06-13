const ItemRouter = require("./ItemRouter");
const DivisionRouter = require("./DivisionRouter");
const CycleRouter = require("./CycleRouter");
const ItemLogRouter = require("./ItemLogRouter");
const NAuthRouter = require("./NAuthRouter");

exports.load = app => {
  app.use("/api/items", ItemRouter);
  app.use("/api/divisions", DivisionRouter);
  app.use("/api/cycles", CycleRouter);
  app.use("/api/itemlogs", ItemLogRouter);
  app.use("/api/nauth", NAuthRouter);

  return app;
};
