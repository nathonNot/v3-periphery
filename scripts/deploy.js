const web3 = require('web3')
async function main() {
  const factoryAdr = '0xf6F9A4C7923Edd38468F14E265E832Ae50eBc424' // Use contract adress in previous step.

  const wwaterAdr =  "0x3e57d6946f893314324C975AA9CEBBdF3232967E"

  const UniswapInterfaceMulticall = await ethers.getContractFactory('UniswapInterfaceMulticall')
  const _UniswapInterfaceMulticall = await UniswapInterfaceMulticall.deploy()
  console.log('UniswapInterfaceMulticall address:', _UniswapInterfaceMulticall.address)

  const Quoter = await ethers.getContractFactory('Quoter')
  const _Quoter = await Quoter.deploy(factoryAdr, wwaterAdr)
  console.log('Quoter address:', _Quoter.address)

  const nativeCurrencyLabelBytes = web3.utils.asciiToHex("BITLAYER\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0");
  const NFTDescriptor = await ethers.getContractFactory('NFTDescriptor')
  const _NFTDescriptor = await NFTDescriptor.deploy()
  console.log('NFTDescriptor address:', _NFTDescriptor.address)

  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
    libraries: {
      NFTDescriptor:  _NFTDescriptor.address
    }
  })
  const _NonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(wwaterAdr, nativeCurrencyLabelBytes)
  console.log('NonfungibleTokenPositionDescriptor address:', _NonfungibleTokenPositionDescriptor.address)
  const NonfungibleTokenPositionDescriptorAddr = _NonfungibleTokenPositionDescriptor.address


  const NonfungiblePositionManager = await ethers.getContractFactory('NonfungiblePositionManager')
  const _NonfungiblePositionManager = await NonfungiblePositionManager.deploy(factoryAdr, wwaterAdr, NonfungibleTokenPositionDescriptorAddr)
  console.log('NonfungiblePositionManager address:', _NonfungiblePositionManager.address)
  const NonfungiblePositionManagerAddr = _NonfungiblePositionManager.address

  const SwapRouter = await ethers.getContractFactory('SwapRouter')
  const _SwapRouter = await SwapRouter.deploy(factoryAdr, wwaterAdr)
  console.log('SwapRouter address:', _SwapRouter.address)


  const V3Migrator = await ethers.getContractFactory('V3Migrator')
  const _V3Migrator = await V3Migrator.deploy(factoryAdr, wwaterAdr, NonfungiblePositionManagerAddr)
  console.log('V3Migrator address:', _V3Migrator.address)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })