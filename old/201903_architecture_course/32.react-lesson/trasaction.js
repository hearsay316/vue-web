class Transaction{
    constructor(wrappers){
        this.wrappers = wrappers;
    }
    perform(anyfunc){
        this.wrappers.forEach(wrapper => {
            wrapper.initailize();
        });
        anyfunc();
        this.wrappers.forEach(wrapper => {
            wrapper.close();
        });
    }
}

let transaction = new Transaction([
    {
        initailize(){
            console.log('start1');
        },
        close(){
            console.log('close1');
        }
    },
    {
        initailize(){
            console.log('start2');
        },
        close(){
            console.log('close2');
        }
    }
]);

transaction.perform(()=>{
    console.log('middle');
})