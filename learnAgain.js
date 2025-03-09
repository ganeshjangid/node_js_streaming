const express=require("express");
const app=express();
const path=require("path");
const fs=require("fs");

app.use(express.static(path.join(__dirname,"public")));
app.get("/",(_,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"));
})

app.get("/video",(req,res)=>{
    const path="./assets/sample.mp4";

    const stat=fs.statSync(path);
    console.log(stat);
    
    const fileSize=stat.size;
    console.log(fileSize);
    
    const range=req.headers.range;
    console.log(range);
    

    const buffer=Buffer.from("Hello World");
    console.log("buffer==>",buffer);
    
    const bufferData=fs.readFileSync(path);
    console.log("bufferData==>",bufferData );
    

    if(range){
        const part=range.replace(/bytes=/,"").split("-");
        console.log(part);
        const start = parseInt(part[0], 10);
        console.log(start);

        const end= part[1] ? parseInt(part[1],10)  : fileSize - 1;
        console.log(end);


        const chunkSize=(end - start) +1;
        console.log(chunkSize);

        const file=fs.createReadStream(path,{start,end});

        const header={
            "Content-Type":"video/mp4",
            "Content-Length":chunkSize,
            "Content-Range":`bytes ${start}-${end}/${fileSize}`,
            "Accept-Range":"bytes"
        };

        res.writeHead(206,header);
        file.pipe(res);
        
        
    }else{

        const header={
            "Content-Length":fileSize,
            "Content-Type":"Video/mp4"
        };
        res.writeHead(200,header);
        fs.createReadStream(path).pipe(res);
    }



})


app.listen("5053",()=>console.log("Your server is running on  PORT 5053"))