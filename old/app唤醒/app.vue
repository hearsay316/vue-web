<template>
    <div class="app" @click="appuser">
        这个是测试微信打开
        <a ref="user" href="weixin://dl/business/?ticket=t12a18b2b6ac3ca603bfae46bd17b58f1"> weixin://dl/business/?ticket=t12a18b2b6ac3ca603bfae46bd17b58f1</a>
    </div>
</template>
<script>
    import { LaunchApp} from 'web-launch-app';


    export default {
        name:"app",
        mounted(){
            alert(11);

            setTimeout(()=>{

            },1000)
            console.log(1123);
          //  myApp.start()
            const lanchApp = new LaunchApp();
            // 简单唤起（参数含义参见Api部分）
           /* lanchApp.open({
                url: 'weixin://',
            });*/
        },
        methods:{
            appuser(){
                window.location.href= 'mqq://dl/business/?ticket=t12a18b2b6ac3ca603bfae46bd17b58f1';
            }

        }
    }
</script>