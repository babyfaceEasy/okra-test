const axios = require('axios').default;

export type NullableWallet = Wallet | null;
export type NullableUser = User | null;
export type NullableWallets = Wallets | null;

interface Wallet{
    amount?: number;
    currency: string;
}

interface Account {
    id: string;
    name: string;
    acct_no: number;
    connected: boolean;
    connected_apps?: string[];
}

interface Profile {
    id: string;
    name: string;
    wallet: NullableWallet;
    accounts?: Account[];
}


interface User {
    profile: Profile;
}

interface Wallets {
    from: NullableWallet,
    to: NullableWallet
}

export class Okra {
    baseURL: string = 'https://api.okra.ng/v2/mock-api';
    public constructor() {

    }

    public login = async (username: string, password: string) => {
        let user: NullableUser = null;

        try {
            let response = await axios.post(`${this.baseURL}/login`, {username, password});
            //console.log(response.data.data.profile.wallet);
            const user: User = response.data.data;
            return user;
        } catch (error) {
            if(error.response && error.response.status == 400){
                console.log("User not found.")
            }else if(error.request){
                console.log('Error: Data was not received.');
            }else{
                console.log('Error' +  error.message());
            }
        }

        return user;
    }

    public fetchWallet = async(id: string): Promise<NullableWallet> => {
        let wallet: NullableWallet = null;
        try {
            let response = await axios.post(`${this.baseURL}/fetch-wallet`, {id});
            wallet = response.data.data.wallet;
            return wallet;
        } catch (error) {
            if (error.response && error.response.status == 400){
                console.log('Wallet resource not found.');
            } else if(error.request){
                console.log('Error: Data was not received.');
            }else{
                console.log('Error' +  error.message());
            }
        }
        
        return wallet;
    }

    public refreshWallet = async(id: string, mockVariable?: string): Promise<NullableWallet> => {
        let wallet: NullableWallet = null;
        try {
            let response = await axios.post(`${this.baseURL}/refresh-wallet`, {id, 'variable': mockVariable});
            wallet = response.data.data.wallet;
        } catch (error) {
            if (error.response && error.response.status == 400){
                console.log('Wallet resource not found.');
            } else if(error.request){
                console.log('Error: Data was not received.');
            }else{
                console.log('Error' +  error.message());
            }
        }
        
        return wallet;
    }

    public logout = async (): Promise<string> => {
        try {
            let response = await axios.get(`${this.baseURL}/logout`)
            return response.data.message;
        } catch (error) {
            if (error.request){
                console.log('Error: Data was not received.');
            }else{
                console.log('Error' +  error.message());
            }
        }

        return '';
    }

    public pay = async(fromID: string, toID: string, amount: number) => {

        let wallets: NullableWallets = null;

        try {
            let response = await axios.post(`${this.baseURL}/pay`, {'from_id': fromID, 'to_id': toID, 'amount': amount});
            wallets = response.data.data.wallets
        } catch (error) {
            if (error.response && error.response.status == 400){
                console.log('Wallet resource not found.');
            } else if(error.request){
                console.log('Error: Data was not received.');
            }else{
                console.log('Error' +  error.message());
            }
        }

        return wallets;

    }
}