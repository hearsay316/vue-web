Promise.resolve(1).finally(()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },2000)
    })
}).then((d)=>{
    console.log(d);
})
