import { NullableUser, Okra } from "../../Libraries/okra-mock";

export class LogicService {
    public okra;
    constructor() {
        this.okra = new Okra();
    }

    logic = async (username: string, password: string) => {
        let response = {
            'status': "success",
            'message': "Successful",
            'data': {}
        }
        // log user in
        let user: NullableUser = await this.okra.login(username, password);
        if(user == null){
            response['status'] = "error";
            response['message'] = "Invalid credentials.";
            return response; 
        }

        // refresh wallet
        const mockVariable = 'Containers';
        let newWallet = await this.okra.refreshWallet(user.profile.id, mockVariable);
        if (newWallet == null){
            response['status'] = "error";
            response['message'] = "Please provide valid user's wallet ID.";
            return response;
        }

        // logout
        let logoutAction = await this.okra.logout();
        if(logoutAction.length == 0){
            response['status'] = "error";
            response['message'] = "Error occurred while logging you out.";
            return response;
        }

        //success
        let balance_before: unknown;
        if(user.profile.wallet !== null) balance_before = user.profile.wallet.amount;
        let data = {
            'name': user.profile.name ,
            'id': user.profile.id,
            'wallet_balance_before': String(balance_before),
            'wallet_balance_after': String(newWallet.amount),
            'logout_message': logoutAction
        }

        response['data'] = data;
        return response;
    }
}