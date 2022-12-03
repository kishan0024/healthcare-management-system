const fs = require("fs");

let data=fs.readFileSync("./localization.json");
data=JSON.parse(data)
// console.log(data.DRUGS.length)

var new_data=[];

var temp;
var new_price={};
var price;
for(var i=0;i<data.DRUGS.length;i++)
{
    price=data.DRUGS[i].MRP;
    if(price[0]=='₹')
    {
        new_data.push({"label":data.DRUGS[i]["Medicine Name"]});
           price=parseFloat(price.substring(1));
           new_price[data.DRUGS[i]["Medicine Name"]]=price;
        // new_price.push(price);.
    }
    else
    {
        new_data.push({"label":data.DRUGS[i]["Medicine Name"]});
           new_price[data.DRUGS[i]["Medicine Name"]]=price;

    }

}

const jsonString=JSON.stringify(new_data);

fs.writeFile('./drugData.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
fs.writeFile('./drugPrice.json', JSON.stringify(new_price), err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
