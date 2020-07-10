import express, { Request, Response } from 'express';
import path from 'path';
const app = express();

app.use(express.static(__dirname));

app.get('/*', (req: Request, res:Response) => {
    res.sendFile(path.resolve(__dirname,'dist','index.html'));
});

const handleListenLog=()=> {
    console.log('Server Starting...');
}

app.listen(8001, handleListenLog);