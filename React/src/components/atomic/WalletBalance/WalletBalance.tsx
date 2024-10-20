import useUserWalletStore from "../../../store/useUserWalletStore"

export default function WalletBalance() {
    const { userWallet } = useUserWalletStore();

    return (
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 me-4 text-primary">Wallet Balance</h5>
            <span className="badge bg-secondary fs-5">
                {userWallet?.balance || '0.00'} ETH
            </span>
        </div>
    );
}
