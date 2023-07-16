const http = require('http');
function getClientIp(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    console.log(ip);
    return ip;
};

const server = http.createServer((req, res) => {

    console.log(getClientIp(req));
    res.end('Hello World!');
});
const port = 3000;
server.listen(port, () => {
    console.log(`伺服器正在監聽連接於 http://localhost:${port}`);
});