export default {
    humanReadableTime: (timestamp) => {

        if(!timestamp){
            return `No Time`
        }
    
        const dateStamp = timestamp ? new Date(Number(timestamp)) : new Date(),
              hours = dateStamp.getHours(),
              mint  = dateStamp.getMinutes(),
              secnd = dateStamp.getSeconds();
    
              return `${hours}:${mint}:${secnd}`
    },

    humanReadableDate: (timestamp) => {
        if(!timestamp){
            return `No Date`
        }

        const date = timestamp ? new Date(timestamp) : new Date(),
        day = ("0" + date.getDate()).slice(-2),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        year = date.getFullYear();
  
       return `${day}-${month}-${year}`

    }
}