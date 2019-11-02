const fs=require('fs');
const express=require('express');
const app=new express();
const path = require('path');

const port=process.env.port || "5053";

app.use(express.static(path.join(__dirname,'public')));


app.get("/",(req,res,next)=>{
    //res.send("Hello By Ganesh");
    res.sendFile(path.join(__dirname,"./index.html"));

});

app.get('/video',(req,res,next)=>{

    const path='./assets/sample.mp4';
    const stat=fs.statSync(path);
    
    const fileSize=stat.size;

    //console.log(stat);
    //console.log(fileSize);
    
    const range = req.headers.range;

    //console.log(range);
    
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        console.log(start);
        
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);

    }else{
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        res.createReadStream(path).pipe(res);
    }

});


app.listen(port,()=> console.log(`Your server is running on port of ${port}`));