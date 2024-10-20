import { useState } from 'react'
import useApi from '../../../customHooks/useApi';
import { ethers } from 'ethers';

function MetaMaskButton() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { isLoading, response, error, fetchData: loginUser } = useApi(apiUrl + "/metamaskwhatever", "POST");

    const [account, setAccount] = useState(null);


    // const connectWallet = async () => {
    //     if (window.ethereum) {
    //         try {
    //             const provider = new ethers.BrowserProvider(window.ethereum);
    //             await window.ethereum.request({ method: "eth_requestAccounts" });

    //             const accounts = await provider.send("eth_accounts", []);
    //             const userAddress = accounts[0];

    //             setAccount(userAddress);

    //             // loginUser(userAddress);
    //         } catch (error) {
    //             console.error("MetaMask connection error: " + error);
    //         }
    //     } else {
    //         console.log("MetaMask is not installed");
    //     }
    // }

    return (
        <div>
            {/* Metamask Login Soon */}
        {/* <button onClick={connectWallet}>
            {account ? `Connected: ${account}` : 'Connect MetaMask'}
        </button> */}
        
        {isLoading && <p>Logging in...</p>}
        {error && <p>Error: {error.message}</p>}
        {response && <p>Logged in as: {response.data.user}</p>}
        </div>
    )
}

export default MetaMaskButton