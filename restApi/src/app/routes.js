import express, { Router } from 'express';
import { Users, Funds } from './controllers/'

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
	fundApi.get('/', auth.requireToken, Fund.list);
	api.use('/f/', fundApi);

	router.get('/', (req, res)=>{
		res.send("Fintech Rest Api");
	})

	return router;
}
