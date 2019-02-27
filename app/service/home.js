const Service = require('egg').Service;

class HomeService extends Service {
    async reqInfo() {
        return this.ctx.req.headers;
    }

    async getCitys() {
        let url = 'http://api.shujuzhihui.cn/api/weather/areaList';
        const result = await this.ctx.curl(url, {
			dataType: 'json',
			method: 'POST',
			data: {
				appKey: "95a09ac396024b0283e772d0580bd5a0"
			}
		});
		return result;
    }
}

module.exports = HomeService;
