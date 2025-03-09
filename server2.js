const fs=require('fs');
const path=require('path');
const http=require('http');

const port=process.env.port || 3652;

const server=http.createServer((req,res)=>{

    //  fs.readFile('./docs.txt',(error,data)=>{

    //     console.log(data.toString());
    //     res.end(data);
        
    // });  
   
    const stream=fs.createReadStream('./docs.txt');
    stream.pipe(res);    
 

});

server.listen(port, ()=> console.log(`Your server is running on port ${port}` ));