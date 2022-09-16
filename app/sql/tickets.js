
import db from "../database";

const Ticket = async ($Id) => {
    console.log(db.tickets)
   

    try {
        const res =  await db.tickets.findByPk($Id);
        return res;
    } catch (error) {
        console.log(error)
      return "faild";   
    }
 };


 export default Ticket;