interface UserWalletType {
    ethAddress: string,
    balance: string,
    network: {
        name: string,
        chainId: bigint,
    }
}

export default UserWalletType;