module.exports={
    
    obtenerFecha(date){
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if(month < 10){
        return `${day}-0${month}-${year}`;
        }else{
            return `${day}-${month}-${year}`;
        }
    }
}
