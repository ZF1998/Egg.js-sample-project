exports.keys = '11150019';

// 模板引擎配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.html': 'nunjucks',
    },
};

// 中间件注册
exports.middleware = [
    'userAgent'
];

// userAgent 中间件配置
exports.userAgent = {
    ua: ''
};

// 存储当前所有路由
exports.routers = [];
