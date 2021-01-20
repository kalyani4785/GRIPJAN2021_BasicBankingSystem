const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const dbUrl = "mongodb://127.0.0.1:27017/GRIP_practice";

var paths = { paths: "Home" };
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//mongoose.connect('mongodb+srv://<username>:<password>@cluster0.ozrpk.mongodb.net/<dbname>?retryWrites=true&w=majority');
mongoose.connect(process.env.MONGODB_URI || dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

var dim = {
  status: "---"
}


const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', dbUrl);
  dim.status = "yes";
})

db.on('error', err => {
  console.error('connection error:', err);
  dim.status = err;

})

const History = {
  from : String,
  to : String,
  amount : Number,
  date: String,
  time: String

};





const customers = {
  name: String,
  id: Number,
  account: Number,
  current: Number,
  mobile: Number,
  branch: String
};

const cust = mongoose.model("cust", customers);
const hist = mongoose.model("hist",History);



const cust1 = new cust({
  name: "Ashish Yadav",
  id: 1,
  account: 465123,
  current: 10000,
  mobile: 6202693660,
  branch: "Hogwards"

});

const cust2 = new cust({
  name: "Santosh Paul",
  id: 2,
  account: 467823,
  current: 10000,
  mobile: 6654693660,
  branch: "Dhanbad"

});
const cust3 = new cust({
  name: "Raj Singh",
  id: 3,
  account: 461123,
  current: 10000,
  mobile: 6202393660,
  branch: "Jharia"

});
const cust4 = new cust({
  name: "Kalyani Dubey",
  id: 4,
  account: 412323,
  current: 10000,
  mobile: 6202699870,
  branch: "Hogwards"

});
const cust5 = new cust({
  name: "Anuj Singh",
  id: 5,
  account: 365123,
  current: 10000,
  mobile: 6652693660,
  branch: "Hirapur"

}); const cust6 = new cust({
  name: "Rupesh Ray",
  id: 6,
  account: 465505,
  current: 10000,
  mobile: 6202697980,
  branch: "Hogwards"

}); const cust7 = new cust({
  name: "Nikhil Jadhav",
  id: 7,
  account: 460012,
  current: 10000,
  mobile: 6202123122,
  branch: "Ranchi"

}); const cust8 = new cust({
  name: "Priya Malhotra",
  id: 8,
  account: 411123,
  current: 10000,
  mobile: 6202123460,
  branch: "Ranchi"

}); const cust9 = new cust({
  name: "Parbind Saikh",
  id: 9,
  account: 165123,
  current: 10000,
  mobile: 6201233660,
  branch: "Dubai"

}); const cust10 = new cust({
  name: "Jitendra Sinha",
  id: 10,
  account: 465323,
  current: 10000,
  mobile: 6201234660,
  branch: "Rehua"

}); const cust11 = new cust({
  name: "Monika Agarwal",
  id: 11,
  account: 4651223,
  current: 10000,
  mobile: 624353660,
  branch: "Kanpur"

}); const cust12 = new cust({
  name: "Manisha Jhunjhunwala",
  id: 12,
  account: 477723,
  current: 10000,
  mobile: 6211193660,
  branch: "Jaipur"

}); const cust13 = new cust({
  name: "Minu Khandela",
  id: 13,
  account: 115123,
  current: 10000,
  mobile: 6211193620,
  branch: "Jaipur"

}); const cust14 = new cust({
  name: "Bheem Singh",
  id: 14,
  account: 400023,
  current: 10000,
  mobile: 6202123456,
  branch: "Ghadwa"

}); const cust15 = new cust({
  name: "Alok Singh setu",
  id: 15,
  account: 965123,
  current: 10000,
  mobile: 621234560,
  branch: "Boribandar"

});

const Datas = [cust1, cust2, cust3, cust4, cust5, cust6, cust7, cust8, cust9, cust10, cust11, cust12, cust13, cust14, cust15];


app.get("/getd", (req, res) => {
  cust.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {
      res.send({ code: 0 });
    } else {
      res.send({ code: 1, foundItems });
    }
  });

})
app.get("/getden", (req, res) => {
  res.send(dim);

})





app.get("/resetD", (req, res) => {

  cust.deleteMany({ id: { $gte: 0 } }).then(function () {
    cust.insertMany(Datas, function (err) {
      if (err) {
        console.log("Data deleted but not reset");
      } else {
        console.log("Successfully saved default items to DB");
        res.redirect("/getd");
        hist.deleteMany({ amount: { $gte: -1 } }).then(function () {
          console.log("whole data deleted sucessfully"); // Success 
        
        }).catch(function (err) {
          console.log("Data not deleted ie, no reset occoured"); // Failure 
        });
      }
    });
    console.log("whole data deleted sucessfully"); // Success 
  }).catch(function (err) {
    console.log("Data not deleted ie, no reset occoured"); // Failure 
  });


})





app.get("/transact", (req, res) => {
  var amt1 = 0;
  var amt2 = 0;
  var ac1 =  parseInt(req.query.from);
  var ac2 = parseInt(req.query.to);
  var amt = parseInt(req.query.amount);
  var ac1name = req.query.ac1name;
  var ac2name = req.query.ac2name;
  var today =new Date();
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  var time = today.getHours()%12+":"+today.getMinutes()+":"+today.getSeconds();


  const hist1 = new hist({
    from : ac1name,
    to : ac2name,
    amount : amt,
    date: date,
    time: time
  })
  
 

  cust.findOne({ account: { $eq: ac1 } }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(docs);
      amt1 = docs.current;
      console.log(amt1-req.query.amt);
      cust.findOne({ account: { $eq: ac2 } }, function (err, docs) {
        if (err) {
          console.log(err)
        }
        else {
          console.log(docs);
          amt2 = docs.current;
          cust.findOneAndUpdate({ account: { $eq: ac1 } },
            { current: (amt1 - amt) }, null, function (err, docs) {
              if (err) {
                console.log(err)
              }
              else {
                console.log("Original Doc : ", docs);
                cust.findOneAndUpdate({ account: { $eq: ac2 } },
                  { current: (amt2 + amt) }, null, function (err, docs) {
                    if (err) {
                      console.log(err);               
            
  
     
                    }
                    else {
                      console.log("Original Doc : ", docs);       
                           // One transaction -------------------------------------------------
                        hist.insertMany(hist1, function (err) {
                          if (err) {
                            console.log("transaction Done History not created");
                          } else {
                            console.log("New Transaction saved");
                          }
                        });
                      // ===================================================================
                      cust.find({}, function (err, foundItems) {

                        if (foundItems.length === 0) {
                          res.send({ code: 0 });
                        } else {
                          res.send({ code: 1, foundItems });
                        }
                      });
                    }
                  });
              }
            });

        }
      });
    }
  });


})



app.get("/transacHistory", (req, res) => {
  hist.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {
      res.send({ code: 0 });
    } else {
      res.send({ code: 1, foundItems });
    }
  });

})
app.get("/clearHist",(req,res)=>{
  hist.deleteMany({ amount: { $gte: -1 } }).then(function () {
    console.log("whole data deleted sucessfully"); // Success 
    res.redirect("/transacHistory");
  }).catch(function (err) {
    console.log("Data not deleted ie, no reset occoured"); // Failure 
  });

})




app.get("/curr", (req, res) => {
  res.send(paths);
})




























app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.redirect("/home");

});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);