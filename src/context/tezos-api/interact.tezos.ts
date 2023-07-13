import axios from 'axios';

// interact with api and some tezos operations
export class InteractTezos {



    apiMint = async (params: any) => {
        let finalResponse: any;
        console.log("Attributes in api mint: ", params.attributes);

        await axios({
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
            },
            data: {
                'attributes': params.attributes,
                'userAddress': params.userAddress,
            },
            url: import.meta.env.VITE_API_URL + '/mint',
        })
            .then(function (response) {
                console.log("API response =>", response);
                finalResponse = response;
            }).catch(function (error) {
                console.log("Api mint error : ", error);
                finalResponse = error.response.data.error;
            });
        console.log("final response : ", finalResponse);

        return finalResponse;
    }

    feelings = async () => {
        let finalResponse: any;
        await axios({
            method: 'get',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/json',
            },
            params: {
            },
            url: import.meta.env.VITE_API_URL + '/feelings',
        })
            .then(function (response) {
                finalResponse = response.data;
            }).catch(function (error) {
                console.log("Connect error : ", error);
            });
        console.log("sales final response : ", finalResponse);

        return finalResponse;
    }

    userNfts = async (userAddress: string) => {
        let finalResponse: any;
        await axios({
            method: 'get',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/json',
            },
            params: {
            },
            url: import.meta.env.VITE_API_URL + `/userNfts/${userAddress}`,
        })
            .then(function (response) {
                finalResponse = response.data;
            }).catch(function (error) {
                console.log("Connect error : ", error);
            });
        console.log("User nfts : ", finalResponse);
        return finalResponse;
    }
}


// first signature
// edsigtv9bYDpFAnY7GCTaayRhrrCBTsMweEAXkg8BpFiZZrHUsLY5BuGyFSbC5pdR6xvzMBepdxp8ZrfpYZzqibiYwM1aDi6ZT7