import express, { Router } from 'express';
import Users from './controllers'

export default (config, db, auth) => {
	const router = Router();

	const api = Router();
	api.get('/', (req, res) => {
		res.send({
			version: '1.0',
			url: req.url
		})
	});
	router.use('/api', api);

	
	router.get('/', (req, res)=>{
		res.send("Fintech Rest Api");
	})

	return router;
}
