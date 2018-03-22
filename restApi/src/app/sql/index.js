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
    get: sql('./fund/fund.get.sql'),
    delete: sql('./fund/fund.delete.sql')
}

const Holding = {
    list: sql('./fund/fund.holding.list.sql'),
    create: sql('./fund/fund.holding.create.sql'),
    delete: sql('./fund/fund.holding.delete.sql')
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
    verify: sql('./follow/follow.verify.sql'),
    list: sql('./follow/follow.list.sql'),
    create: sql('./follow/follow.create.sql'),
    delete: sql('./follow/follow.delete.sql'),
    count: sql('./follow/follow.count.user.sql')
}

const Tier = {
    get: sql('./tier/tier.get.sql'),
    list: sql('./tier.list.sql')
}

export {
    User,
    Fund,
    Holding,
    Prediction,
    PredictionMeta,
    Follow,
    Tier
}