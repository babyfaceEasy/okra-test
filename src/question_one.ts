import { RefundService } from "./app/Services/refund-service";


const companyID = "573839293";
const customerID = "573839293";
const amount = 2000

// Question 1 response
const question_1 = async () => {
    let refund_service = new RefundService();
    let response = await refund_service.refund(companyID, customerID, amount);

    console.log(response);
}

question_1();