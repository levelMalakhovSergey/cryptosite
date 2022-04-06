const {createProxyMiddleware} = require("http-proxy-middleware");


module.exports= (app) => {
    app.use(
        ['/symbols','/pubticker'],

        createProxyMiddleware({
            target: 'https://api.bitfinex.com/v1',
            changeOrigin: true,
        })
    );
}