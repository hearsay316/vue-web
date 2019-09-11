// fs.open  fs.read 读文件 和写文件
let fs = require ('fs');
let path = require ('path');
// let buffer = Buffer.alloc(3);
// flags 对文件的擦欧总类型 W r + s
/*fs.open (path.resolve (__dirname, 'age.txt'), 'r', 0o666, (err, df) => {
        console.log (df);
        fs.read (df, buffer, 0, 3, 4, (err, bytesRead) => {
            console.log (bytesRead);
            console.log (buffer.toString ());
        })
    }
);*/

/*
let buffer2 = Buffer.from("珠峰");
fs.open(path.resolve(__dirname,'./name.txt'),'r+',(err,fd)=>{
    //fd 代表的是写入的文件描述符  写入的内容   当前写的位置 ,buffer选几个写几个   0 写入文件的位置
    fs.write(fd,buffer2,0,buffer2.length,0,(err,written)=>{
        console.log(written);
    })
});*/

function copy(source, target) {
    let buffer = Buffer.alloc (10000);
    let pos = 0;
    fs.open (source, 'r', (err, rfd) => {
        fs.open (target, 'w', (err, wfd) => {
            function next() {
                fs.read (rfd, buffer, 0, 3, pos, (err, bytesRead) => {
                    if (bytesRead > 0) {
                        pos += bytesRead;
                        fs.write (wfd, buffer, 0, bytesRead, (err, written) => {
                            next ();
                        })
                    } else {
                        console.log ('结束了');
                        fs.close (rfd, () => {
                        });
                        fs.close (wfd, () => {
                        });
                    }
                })
            }

            next ();
        })
    })
}


copy (path.resolve (__dirname, './name.txt'), path.resolve (__dirname, './age.txt'));
