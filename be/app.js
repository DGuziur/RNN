const app = require('express')();
const port = 8080;
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('runPythonCode', (code) => {
        const pythonProcess = spawn('python', ['-u', '-c', code]);

        pythonProcess.stdout.setEncoding('utf-8');
        pythonProcess.stdout.on('data', (data) => {
            socket.emit('output',`${data}`);
        });
        
        socket.on('input', (data) => {
            pythonProcess.stdin.write(data + '\n');
        });
    
        pythonProcess.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
        });
    
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            pythonProcess.stdout.removeAllListeners('data');
            pythonProcess.kill(); 
        });
    });
});

server.listen(port, () => {
    console.log(`Server up on http://localhost:${port}/`);
});
