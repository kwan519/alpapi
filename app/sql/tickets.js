
import db from "../database";

const Ticket = async ($Id) => {
    try {
        const res =  await db.tickets.findByPk($Id);
        return res;
    } catch (error) {
        console.log(error)
      return "faild";   
    }
 };


 export default Ticket;