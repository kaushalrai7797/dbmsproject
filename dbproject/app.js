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

var r=0;
app.post("/billno" , function (req, res) {


    con.query('select distinct(count(billno)) as prim from ordername',function(err,data){
        r= data[0].prim;
        r=r+1;
        // console.log(r + "inside");
        res.render("order2");
    })


})




app.get("/total" , function (req,res) {

    res.render("amount.ejs");

})


app.post("/sendorder", function (req, res) {



    con.query('select distinct(count(billno)) as prim from ordername',function(err,data){
        //r= data[0].prim;
        //r=r+1;
        // console.log(r + "inside");
        con.query(`insert into ordername values (`+r+` ,${req.body.new_item}, ${req.body.new_item2}, ${req.body.new_item3} )`, function (err,data) {

             console.log(err);
             console.log(data);

        })


    });

     res.render("order2");
})


    app.get("/empform", function (req, res) {
            res.render("employee")
    })





    app.post("/empentry",function(req,res){

        con.query('select distinct(count(eid)) as prim from employee',function(err,data){
            r= data[0].prim;
            r=r+1;
            eid=r;
            ename = req.body.name;
            ephone = req.body.phone;
            houseno=req.body.phone;
            pincode = req.body.pincode;
            dept = req.body.dept;
            var sql = 'insert into employee set ?';
            var x = {eid:r,ename:ename,ephone:ephone,houseno:houseno,pincode:pincode,dept:dept};
            con.query(sql,x, function(err, result){
                if (err)
                    console.log(err);
                console.log(result);
            });

            res.render("employee");
        });
    });



app.post ("/getamount", function (req, res) {

    con.query()

})




app.listen(7402 || process.env.PORT,function(){
    console.log("running....");
});
