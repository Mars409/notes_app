import app from "./app.js";
// 使用Node.js内置的net模块检查端口是否被占用
import net from 'net';

const PORT = process.env.PORT || 3000;

// 检查端口是否被占用的函数
function isPortInUse(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(true);
            } else {
                resolve(false);
            }
        });
        server.on('listening', () => {
            server.close(() => {
                resolve(false);
            });
        });
        server.listen(port);
    });
}

// 启动服务器的函数
async function startServer() {
    if (await isPortInUse(PORT)) {
        console.log(`Port ${PORT} is already in use.`);
        return;
    }
    app.listen(PORT, () => {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} Server running on port ${PORT}`);
    });
    app.on('error', (err) => {
        const timestamp = new Date().toISOString();
        console.error(`${timestamp} Server error:`, err);
    });
}

startServer();