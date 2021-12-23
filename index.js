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

app.post("/", (req, res, err) => {
    try {
        const today = new Date();
        today.toLocaleString('en-IN', { timeZone: 'Asia/Calcutta' });
        const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
        const time = `${today.getHours()}-${today.getMinutes() < 10 ? "0"+today.getMinutes() : today.getMinutes()}`;
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