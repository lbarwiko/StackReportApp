import express, { Router } from 'express';
import { Users, Funds, Predictions, Follow, Security } from './controllers/'

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
	userApi.post('/', User.create, auth.requireLogin, User.get);
	userApi.get('/:user_id', User.get);
	userApi.param('user_id', User.params.user_id);
	api.use('/u/', userApi);

	const authApi = Router();
	authApi.post('/', auth.requireLogin, User.get);
	api.use('/auth', authApi);

	const fundApi = Router();
	const Fund = Funds(db, config).rest;
	fundApi.get('/', Fund.list);
	fundApi.post('/', Fund.create);
	fundApi.get('/:fund_id', Fund.get);
	fundApi.delete('/:fund_id', Fund.remove);
	fundApi.put('/:fund_id/', Fund.upsert);
	fundApi.param('fund_id', Fund.params.fund_id);
	api.use('/f/', fundApi);

	const predictionApi = Router();
	const Prediction = Predictions(db, config).rest;
	predictionApi.get('/', Prediction.list);
	predictionApi.post('/', Prediction.create);
	fundApi.get('/:fund_id/p/', Prediction.list);
	api.use('/p/', predictionApi);

    const followingApi = Router();
    const Following = Follow(db, config).rest;
	fundApi.post('/:fund_id/follow', auth.requireToken, Following.create);
	fundApi.delete('/:fund_id/follow', auth.requireToken, Following.remove);
	fundApi.get('/:fund_id/follow', auth.requireToken, Following.verify);
	api.use('/following/', followingApi);
	
	const securityApi = Router();
	const Securities = Security(db, config).rest;
	securityApi.get('/:security_id', Securities.get);
	securityApi.get('/', Securities.get);
	api.use('/security/', securityApi);

	const meApi = Router();
	meApi.get('/', auth.requireToken, User.get);
	meApi.get('/following/', auth.requireToken, Following.list);
	api.use('/me/', meApi);

	api.get('/.well-known/acme-challenge/:id', function(req, res, next) {
		res.send(req.params.id + '.' + 'HvBmjhjg7Ng9HAGb1bmUtrF4gqOWj8LZ56Gx5HyBBNg');
	});
	router.get('/', (req, res)=>{
		res.send("Fintech Rest Api");
	})

	return router;
}
