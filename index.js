const express = require('express');
const fs = require('fs');

const app = express();
app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public')); 

app.get("/", (req, res) => {
    const directoryName = __dirname + "/public/time";
    const fileNames = fs.readdirSync(directoryName);
    res.send(fileNames);
})

app.post("/time", (req, res, err) => {
    try {
        let today = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        let [date, time] = today.split(", ");
        date = date.split("/").join("-");
        time = time.split(":").join("-");
        const filename = `${date}_${time}`;
        const filepath = __dirname + `/public/time/${filename}.txt`;
        
        fs.appendFile(filepath, today.toString(), (err) => {
            if (err) throw err;
            res.send("Timestamp saved");
            console.log("saved");
        })

    } catch (err) {
        console.log(err);
    }
})

app.listen(process.env.PORT || 3001, () => {
    console.log("listening on port 3001");
})