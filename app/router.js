/**
 * 路由定义
 */
module.exports = app => {
    const {
        router,
		controller,
		config
	} = app;
	
	const ROUTER = [
		['get', ['/', controller.home.index]],
		['get', ['/citys', controller.home.citys]]
	];

	ROUTER.forEach(o => {
		let method = o[0];
		let params = o[1];
		config.routers.push(params[0]);
		router[method](...params);
	});

};
