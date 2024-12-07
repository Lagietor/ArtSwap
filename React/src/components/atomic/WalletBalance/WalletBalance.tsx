import useUserWalletStore from "../../../store/useUserWalletStore";

export default function WalletBalance() {
    const { userWallet } = useUserWalletStore();

    // Funkcja skracająca adres, np. 0x1234...abcd
    function shortenAddress(address: string, chars = 4) {
        return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
    }

    // Funkcja formatująca balans z ograniczeniem do 2 miejsc po przecinku
    function formatBalance(balance: string) {
        return parseFloat(balance).toFixed(2); // Ogranicza do 2 miejsc po przecinku
    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 me-4 text-primary">Wallet Balance</h5>
            <span className="badge bg-primary fs-6 text-dark text-wrap text-start">
                <small className="text-secondary">Account: {userWallet?.ethAddress ? shortenAddress(userWallet.ethAddress) : "No Account Connected"}</small>
                <br />
                {userWallet?.balance ? formatBalance(userWallet.balance) : '0.00'} ETH
            </span>
        </div>
    );
}