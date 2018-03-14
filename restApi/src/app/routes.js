import express, { Router } from 'express';
import { Users, Funds, Predictions, Follow } from './controllers/'

export default (db, config, auth) => {
	const router = Router();

	const api = Router();
	api.get('/', (req, res) => {
		res.send({
			version: '1.0',
			url: req.url
		})
	});
	router.use('/api', api);

	const userApi = Router();
	const User = Users(db, config).rest;
	userApi.get('/', User.list);
	userApi.post('/', User.create);
	userApi.get('/:user_id', User.get);
	userApi.param('user_id', User.params.user_id);
	api.use('/u/', userApi);

	const authApi = Router();
	authApi.post('/', auth.requireLogin, User.get);
	api.use('/auth', authApi);

	const meApi = Router();
	meApi.get('/', auth.requireToken, User.get);
	api.use('/me/', meApi);

	const fundApi = Router();
	const Fund = Funds(db, config).rest;
	fundApi.get('/', Fund.list);
	fundApi.post('/', Fund.create);
	fundApi.get('/:fund_id', Fund.get);
	fundApi.param('fund_id', Fund.params.fund_id);
	api.use('/f/', fundApi);

	const predictionApi = Router();
	const Prediction = Predictions(db, config).rest;
	predictionApi.get('/', Prediction.list);
	predictionApi.post('/', Prediction.create);
	fundApi.get('/:fund_id/p/', Prediction.list);
	api.use('/p/', predictionApi);

    const followingApi = Router();
    const Following = Follow(db, config);
    followingApi.get('/', Following.list);
    api.use('/following/', followingApi);

	router.get('/', (req, res)=>{
		res.send("Fintech Rest Api");
	})

	return router;
}
