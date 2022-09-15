
var FormData = require('form-data');
const fs=require('fs');
module.exports={
    
    async get(req, res) {
        try{
          
        var path=req.params["path"];
        var name=req.params["name"];
        var form = new FormData();
        form.append('pdf',fs.createReadStream("uploads"+"/"+path+"/"+name));
        res.setHeader('Content-Type', 'application/pdf');
        form.pipe(res);
        }
        catch(e){
            console.log(e);
            res.status(404).send(e); 
  
        }
  
  
    },
}