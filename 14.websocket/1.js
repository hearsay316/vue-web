let express = require("express");
let app = express();
app.use(express.static(__dirname));
app.get("/clock", function (req, res) {
   // res.end (new Date ().toLocaleString ());
    setInterval(function () {
        let data = new Date().toLocaleString();
        res.write(`
<script type="text/javascript">
parent.document.getElementById('clock').innerText = "${data}";
</script>
        
                 `)
    },16)
});
 app.listen(8080);