function client(ua) {

    // 引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        opera: 0,
        // 实际版本
        ver: 0
    };

    // 浏览器版本
    var browser = {
        ie: 0,
        firefox: 0,
        chrome: 0,
        safari: 0,
		opera: 0,
		QQBrowser: 0,
        // 实际版本
        ver: 0
    };

    // 平台及操作系统
    var os = {
        win: 0,
        mac: 0
    };

    var reg;

    // 检测浏览器和引擎
    if (reg = /OPR\/(\S+)/.exec(ua)) {
        // opera
        engine.opera = browser.opera = parseInt(reg[1]);
        engine.ver = browser.ver = reg[1];

    } else if (reg = /AppleWebKit\/(\S+)/.exec(ua)) {
        engine.ver = reg[1];
		engine.webkit = parseInt(reg[1]);
		
		if (reg = /MQQBrowser\/(\S+)/.exec(ua)) {
			// MQQBrowser
			browser.QQBrowser = parseInt(reg[1]);
            browser.ver = reg[1];
		} else if (reg = /Version\/(\S+)/.exec(ua)) {
            // safari
            browser.safari = parseInt(reg[1]);
            browser.ver = reg[1];

        } else if (reg = /Chrome\/(\S+)/.exec(ua)) {
            // chrome
            browser.chrome = parseInt(reg[1]);
            browser.ver = reg[1];

        }

    } else if (reg = /rv:\S+\) Gecko\/(\d{8})/.exec(ua)) {
        engine.ver = reg[1];
        engine.gecko = parseInt(reg[1]);

        if (reg = /Firefox\/(\S+)/.exec(ua)) {
            // firefox
            browser.ver = reg[1];
            browser.firefox = parseInt(reg[1]);
        }

    } else if (reg = /MSIE (\S+)/.exec(ua)) {
        // ie < 11.0
        engine.ver = browser.ver = reg[1];
        engine.ie = browser.ie = parseInt(reg[1]);

    }

    // 检测平台
    // var p = navigator.platform;
    // os.win = p.indexOf('Win') == 0;
    // os.mac = p.indexOf('Mac') == 0 ? "mac" : "";

    // if (os.win) {
    //     // 区别 Windows 版本
    //     if (reg = /Win(?:dows)?\s?\w{2}\s?(\d+\.\d+)/.exec(ua)) {

    //         switch (reg[1]) {
    //             case "10.0":
    //                 os.win = 'win10';
    //                 break;

    //             default:
    //                 break;
    //         }
    //     }
    // }

	let filter = v => {
		return Object.keys(v).filter(k => {
			return v[k] != 0;
		}).map(k => {
			return k == 'ver'?v['ver']:k;
		}).join(':');
	};

    return {
        "engine": filter(engine),
        "browser": filter(browser),
        // "os": os
    };

};

/**
 * 定义中间件 判断客户端以及客户端的浏览器引擎
 * @param {Object} options 根据配置文件获取跟文件名同名的中间件配置对象
 * @param {Object} app 
 */
module.exports = (options, app) => {
    return async function userAgentMiddleware(ctx, next) {
        const ua = ctx.get('user-agent') || '';
        options.ua = client(ua);
        await next();
    }
};
