import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x98fe5D56616da3C02d4A05d61e991524e12388D4",
        abi as any,
        signer
    );
}