// src/main/frontend/src/setProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    
    createProxyMiddleware('/api', {
            target: 'http://localhost:8080', // 비즈니스 서버 URL 설정
            changeOrigin: true
        })
  );
};