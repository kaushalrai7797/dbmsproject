    var express = require('express');
    var app = express();
    var mysql = require('mysql');
    var request = require('request');
    var bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({extended:true}));

    app.set('view engine','ejs');

    var con = mysql.createConnection({
        host: "localhost",
        user: "kaushal7",
        password: "1234",
        insecureAuth: true,
        database: "dbproject"
    });


    con.connect(function(err) {
        if (err) {
            throw err;
            console.log(err);
        }
        console.log("Connected!");
    });

app.get("/",function(req,res){
    res.render("order2");
});
    var r;
app.post("/sendorder", function (req, res) {



    con.query('select distinct(count(billno)) as prim from ordername',function(err,data){
        r= data[0].prim;
        r=r+1;
        // console.log(r + "inside");
        con.query(`insert into ordername values (`+r+` ,${req.body.new_item}, ${req.body.new_item2}, ${req.body.new_item3} )`, function (err,data) {

             console.log(err);
             console.log(data);

        })


    });

     res.render("confirm");
})




app.listen(7402 || process.env.PORT,function(){
    console.log("running....");
});
