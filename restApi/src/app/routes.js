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
	api.use('/u/', userApi);

	const fundApi = Router();
	const Fund = Funds(db, config).rest;
	fundApi.all('/', function(req, res, next) {
  		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		next();
 	});
	fundApi.get('/', Fund.list);
	api.use('/f/', fundApi);

	router.get('/', (req, res)=>{
		res.send("Fintech Rest Api");
	})

	return router;
}
