async function main() {

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const example = await ethers.getContractFactory("HelloWorld");
    const contract = await example.deploy();

    console.log("Contract deployed at:", contract.target);

    const saySomething = await contract.speak();
    
    console.log("saySomething value:", saySomething);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});