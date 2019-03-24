const fs = require('fs');
const fsPromise = fs.promises;
const csv = require('csvtojson');
const isValid = (path) => {
    return new Promise((resolve, reject)=>{
        fs.access(path, fs.constants.F_OK, (err)=>{
            if(err) reject(err);
            else resolve(path);
        });
    });
}


let csvConverter = (a) => {
    csv()
        .fromFile(a)
        .then(json=>{
            if(json){
                let fileName = `./2015_json/${monthName}/` + a.slice(7,22);
                fileWriter(fileName, json);
            }
        });
}


let fileWriter = (fileName, data) => {
        fsPromise
            .writeFile(fileName+".json", " {\""+ monthName + "\"\ : " + JSON.stringify(data)+ "}")
            .then(()=>console.log("DONE DONE"))
            .catch(err=>console.log(err));
}
let monthName = "DEC"
let a = () => {
    for(var i=0;i<=31;i++){
        if(i<10){
            isValid(`./2015/cm0${i}${monthName}2015bhav.csv`)
            .then((a)=>{
                csvConverter(a);
            })
            .catch(err=>console.log(err));
        }
        else if(i>9 && i<32){
            isValid(`./2015/cm${i}${monthName}2015bhav.csv`)
            .then((a)=>{
                csvConverter(a);
            })
            .catch(err=>console.log(err));
        }
    }
}
a();
