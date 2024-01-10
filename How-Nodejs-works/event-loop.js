// numbers represents order of execution

const fs = require('fs') //2
const crypto = require('crypto')
const start = Date.now();
// changing thread pool size
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log('Timer 1 finished'), 0); //3
setImmediate(() => console.log('Immediate 1 finished')); //4


fs.readFile("./test-file.txt" , () => {
    console.log("I/O finished")
    console.log("------------")
    setTimeout(() => console.log('Timer 2 finished'), 0); 
    setTimeout(() => console.log('Timer 3 finished'), 3000); 
    setImmediate(() => console.log('Immediate 2 finished'));
    
    process.nextTick(() => console.log('Process.nextTick'))
    
    // will be offloaded to thread poll
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, "Password encrypted")
    })
    // will be offloaded to thread poll
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, "Password encrypted")
    })// will be offloaded to thread poll
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, "Password encrypted")
    })// will be offloaded to thread poll
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, "Password encrypted")
    })
}); // 4


console.log('Hello from top level code') //1

