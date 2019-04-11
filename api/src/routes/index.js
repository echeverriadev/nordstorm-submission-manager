const ItemRouter = require('./ItemRouter');
const DivisionRouter = require('./DivisionRouter');
const CycleRouter = require('./CycleRouter');

exports.load = (app) => {
    app.use('/items', ItemRouter)
    app.use('/divisions', DivisionRouter)
    app.use('/cycles', CycleRouter)

    return app
};