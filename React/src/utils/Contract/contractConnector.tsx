import { ethers } from 'ethers';
import contractABI from '../../contractABI/MyNFT.json';

const CONTRACT_ADDRESS = '0xA6DA8F64BfacC1E3f1a5B14Ac91eA02873EeFa8C';
const CONTRACT_ABI = contractABI.abi;

export async function getContract() {
    try {
        const provider = new ethers.JsonRpcProvider("http://localhost:7545");
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        return contract;
    } catch (err) {
        console.error('Błąd połączenia z kontraktem:', err);
        throw new Error('Nie udało się połączyć z kontraktem');
    }
}

export async function getTokenOwner(tokenId: bigint) {
    const contract = await getContract();
    const tokenOwner = await contract.ownerOf(tokenId);
    return tokenOwner;
}