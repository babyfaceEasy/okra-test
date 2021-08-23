import {NullableWallet, Okra} from '../../Libraries/okra-mock';
export class RefundService {
    public okra;
    constructor() {
        this.okra = new Okra();
    }

    refund = async (companyID: string, toID: string, amount: number) => {
        let output: {
            before: NullableWallet,
            after: NullableWallet
        } = {
            before: {
                amount: undefined,
                currency: "NGN"
            },
            after: {
                amount: undefined,
                currency: "NGN"
            }
        }
        // check for company's wallet
        let customerWallet = await this.okra.fetchWallet(toID);
        if (customerWallet == null){
            console.log("Customer wallet doesnot exist.");
            return output;
        }
        let companyWallet: NullableWallet = await this.okra.fetchWallet(companyID);
        if (companyWallet == null){
            console.log("Company's wallet does not exist.");
            return output;
        }

        
        if ( companyWallet.amount &&  companyWallet.amount < amount ) {
            console.log("Company does not have sufficient balance.");
            return output;
        }

        // pay 
        let performRefund = await this.okra.pay(companyID, toID, amount);
        if (performRefund == null){
            console.error("Error occured while trying to refund cash.");
            return output;
        }

        output['before'] = customerWallet;
        output['after'] = performRefund['to'];

        return output;

    }
}