const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file){
    const fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

const User = {
    list: sql('./user/user.list.sql'),
    create: sql('./user/user.create.sql'),
    getById: sql('./user/user.getById.sql'),
    getByUsername: sql('./user/user.getByUsername.sql'),
    getByIdPublic: sql('./user/user.getByIdPublic.sql')
}

const Fund = {
    list: sql('./fund/fund.list.sql'),
    create: sql('./fund/fund.create.sql')
}

const Prediction = {
    list: sql('./prediction/prediction.list.sql'),
    create: sql('./prediction/prediction.create.sql'),
}

const PredictionMeta = {
    list: sql('./prediction/prediction.meta.list.sql'),
    create: sql('./prediction/prediction.meta.create.sql')
}

export {
    User,
    Fund,
    Prediction,
    PredictionMeta
}