pragma solidity ^0.6.0;

////////////////////////////////////////////////////////////////////////////////////////////
/// @title WarpVaultSCFactoryI
/// @author Christopher Dixon
////////////////////////////////////////////////////////////////////////////////////////////
/**
The WarpVaultSCFactoryI contract is used by the Warp Control contract to interface with the WarpVaultSCFactory contract
This contract uses the OpenZeppelin contract Library to inherit functions from
  Ownable.sol
**/

abstract contract WarpVaultSCFactoryI {
    /**
  @notice createNewWarpVaultSC is used to create new WarpVaultSC contract instances
  @param _InterestRate is the address of the InterestRateModel contract created for this Warp Vault
  @param _StableCoin is the address of the stablecoin contract this WarpVault will manage
  @param _initialExchangeRate is the exchange rate mantissa used to determine the initial exchange rate of stablecoin to warp stablecoin
    **/
    function createNewWarpVaultSC(
        address _InterestRate,
        address _StableCoin,
        uint256 _initialExchangeRate
    ) public virtual returns (address);
}
