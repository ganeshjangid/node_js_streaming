/* const fs=require('fs');

let fileName='./docs.txt';

fs.readFile(fileName,(err,data)=>{

    //console.log(data.toString());
    if(err) throw err;
    

    fs.writeFile('./docs1.txt',data,(err)=>{

        if(err) throw err;
    });

    console.log("New file has created");
    
});


let buffer=new Buffer(20);

console.log(buffer);


let name="NODE JS DEV";
let buffer1=new Buffer.from(name);

//console.log(buffer1);
console.log(buffer1.toString());




 */



const stream = require('stream');
const fs = require('fs');

let fileName = "./docs.txt";
let destPath = "./docs1.txt";

const readabale = fs.createReadStream(fileName);
const writeable = fs.createWriteStream(destPath || "output");

fs.stat(fileName, (err, stats) => {
    this.fileSize = stats.size;
    this.counter = 1;
    this.fileArray = fileName.split('.');

    try {
        this.duplicate = destPath + "/" + this.fileArray[0] + '_Copy.' + this.fileArray[1];
    } catch (e) {
        console.exception('File name is invalid! please pass the proper one');
    }

    process.stdout.write(`File: ${this.duplicate} is being created:`);

    readabale.on('data', (chunk) => {
        let percentageCopied = ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write(`${Math.round(percentageCopied)}%`);
        writeable.write(chunk);
        this.counter += 1;
    });

    readabale.on('end', (e) => {
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write("Successfully finished the operation");
        return;
    });

    readabale.on('error', (e) => {
        console.log("Some error occured: ", e);
    });

    writeable.on('finish', () => {
        console.log("Successfully created the file copy!");
    });

});