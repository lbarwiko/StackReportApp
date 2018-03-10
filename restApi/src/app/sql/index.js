const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file){
    const fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, {minify: true});
}

const User = {
    list: sql('./user/user.list.sql'),
    create: sql('./user/user.create.sql'),
    getById: sql('./user/user.get.id.sql'),
    getByUsername: sql('./user/user.get.username.sql'),
    getByIdPublic: sql('./user/user.get.id.public.sql')
}

const Fund = {
    list: sql('./fund/fund.list.sql'),
    create: sql('./fund/fund.create.sql'),
    get: sql('./fund/fund.get.sql')
}

const Prediction = {
    list: sql('./prediction/prediction.list.sql'),
    create: sql('./prediction/prediction.create.sql')
}

const PredictionMeta = {
    list: sql('./prediction/prediction.meta.list.sql'),
    create: sql('./prediction/prediction.meta.create.sql'),
    get: sql('./prediction/prediction.meta.get.sql')
}

const Follow = {
    get: sql('./follow/follow.get.sql'),
    create: sql('./follow/follow.create.sql'),
    delete: sql('./follow/follow.delete.sql')
}

export {
    User,
    Fund,
    Prediction,
    PredictionMeta,
    Follow
}