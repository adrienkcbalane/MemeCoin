import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x64145CDfb47F5E5A1B67F9a221B92e0756ae5e09",
        abi as any,
        signer
    );
}