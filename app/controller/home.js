const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
		const ctx = this.ctx;
		// 通过定义的 service 获取数据
        const headers = await ctx.service.home.reqInfo();
		
        await this.ctx.render('home.html', {
            reqData: headers,
            ua: this.config.userAgent.ua,
            protocol: ctx.protocol,
            method: ctx.method,
			title: 'Egg Sample Project',
			routers: this.config.routers
        });
    }

    async citys() {
        const ctx = this.ctx;
		const result = await ctx.service.home.getCitys();
		
		ctx.status = result.status;
		ctx.set(result.headers);
    	ctx.body = result.data;
    }

}

module.exports = HomeController;
