const ItemRouter = require("./ItemRouter");
const DivisionRouter = require("./DivisionRouter");
const CycleRouter = require("./CycleRouter");
const ItemLogRouter = require("./ItemLogRouter");
const NAuthRouter = require("./NAuthRouter");
const SubDivisionRouter = require("./SubDivisionRouter");
const CycleSubDivisionRouter = require("./CycleSubDivisionRouter");
const RmsRouter = require("./RmsRouter");

exports.load = app => {
  app.use("/api/items", ItemRouter);
  app.use("/api/divisions", DivisionRouter);
  app.use("/api/cycles", CycleRouter);
  app.use("/api/itemlogs", ItemLogRouter);
  app.use("/api/nauth", NAuthRouter);
  app.use("/api/subdivisions", SubDivisionRouter);
  app.use("/api/cyclesubdivision", CycleSubDivisionRouter);
  app.use("/api/rms", RmsRouter);

  return app;
};
