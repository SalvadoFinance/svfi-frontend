/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  UniswapV3Adapter,
  UniswapV3AdapterInterface,
} from "../../../contracts/exchanges/UniswapV3Adapter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "POOL_FEE",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract ISwapRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516111d83803806111d883398101604081905261002f916100af565b6001600160a01b0381166080819052604080516312a9293f60e21b81529051634aa4a4fc916004808201926020929091908290030181865afa158015610079573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061009d91906100af565b6001600160a01b031660a052506100df565b6000602082840312156100c157600080fd5b81516001600160a01b03811681146100d857600080fd5b9392505050565b60805160a0516110a56101336000396000607101526000818160e301528181610164015281816102800152818161046d01528181610521015281816105bd015281816106d901526108c601526110a56000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063c31c9c0711610050578063c31c9c07146100de578063dd1b9c4a14610105578063fa775c0f1461012257600080fd5b80634aa4a4fc1461006c5780636e03efb5146100bd575b600080fd5b6100937f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100d06100cb366004610c81565b610135565b6040519081526020016100b4565b6100937f000000000000000000000000000000000000000000000000000000000000000081565b61010e610bb881565b60405162ffffff90911681526020016100b4565b6100d0610130366004610c81565b61058e565b60006101898686600081811061014d5761014d610d35565b90506020020160208101906101629190610d64565b7f00000000000000000000000000000000000000000000000000000000000000008961094e565b6002859003610322576000604051806101000160405280888860008181106101b3576101b3610d35565b90506020020160208101906101c89190610d64565b73ffffffffffffffffffffffffffffffffffffffff168152602001888860018181106101f6576101f6610d35565b905060200201602081019061020b9190610d64565b73ffffffffffffffffffffffffffffffffffffffff168152602001610bb862ffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018a8152602001898152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663db3e2198826040518263ffffffff1660e01b81526004016102d79190610d86565b6020604051808303816000875af11580156102f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061031a9190610e07565b9150506104ec565b606060005b610332600188610e4f565b81101561039a578188888381811061034c5761034c610d35565b90506020020160208101906103619190610d64565b610bb860405160200161037693929190610e96565b6040516020818303038152906040529150808061039290610f0d565b915050610327565b508087876103a9600182610e4f565b8181106103b8576103b8610d35565b90506020020160208101906103cd9190610d64565b6040516020016103de929190610f45565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815260a08301825280835273ffffffffffffffffffffffffffffffffffffffff8089166020850152838301889052606084018d9052608084018c905291517ff28c04980000000000000000000000000000000000000000000000000000000081529093507f00000000000000000000000000000000000000000000000000000000000000009091169063f28c0498906104a4908490600401611023565b6020604051808303816000875af11580156104c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e79190610e07565b925050505b86811015610583576105478686600081811061050a5761050a610d35565b905060200201602081019061051f9190610d64565b7f0000000000000000000000000000000000000000000000000000000000000000600061094e565b6105838686600081811061055d5761055d610d35565b90506020020160208101906105729190610d64565b308661057e858c610e4f565b610ac3565b979650505050505050565b60006105e2868660008181106105a6576105a6610d35565b90506020020160208101906105bb9190610d64565b7f00000000000000000000000000000000000000000000000000000000000000008a61094e565b600285900361077b5760006040518061010001604052808888600081811061060c5761060c610d35565b90506020020160208101906106219190610d64565b73ffffffffffffffffffffffffffffffffffffffff1681526020018888600181811061064f5761064f610d35565b90506020020160208101906106649190610d64565b73ffffffffffffffffffffffffffffffffffffffff168152602001610bb862ffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018a8152602001898152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663414bf389826040518263ffffffff1660e01b81526004016107309190610d86565b6020604051808303816000875af115801561074f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107739190610e07565b915050610583565b606060005b61078b600188610e4f565b8110156107f357818888838181106107a5576107a5610d35565b90506020020160208101906107ba9190610d64565b610bb86040516020016107cf93929190610e96565b604051602081830303815290604052915080806107eb90610f0d565b915050610780565b50808787610802600182610e4f565b81811061081157610811610d35565b90506020020160208101906108269190610d64565b604051602001610837929190610f45565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815260a08301825280835273ffffffffffffffffffffffffffffffffffffffff8089166020850152838301889052606084018d9052608084018c905291517fc04b8d590000000000000000000000000000000000000000000000000000000081529093507f00000000000000000000000000000000000000000000000000000000000000009091169063c04b8d59906108fd908490600401611023565b6020604051808303816000875af115801561091c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109409190610e07565b9a9950505050505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f095ea7b30000000000000000000000000000000000000000000000000000000017905291516000928392908716916109e59190611036565b6000604051808303816000865af19150503d8060008114610a22576040519150601f19603f3d011682016040523d82523d6000602084013e610a27565b606091505b5091509150818015610a51575080511580610a51575080806020019051810190610a519190611052565b610abc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600260248201527f534100000000000000000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b5050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790529151600092839290881691610b629190611036565b6000604051808303816000865af19150503d8060008114610b9f576040519150601f19603f3d011682016040523d82523d6000602084013e610ba4565b606091505b5091509150818015610bce575080511580610bce575080806020019051810190610bce9190611052565b610c34576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f53544600000000000000000000000000000000000000000000000000000000006044820152606401610ab3565b505050505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610c6057600080fd5b919050565b8015158114610c7357600080fd5b50565b8035610c6081610c65565b600080600080600080600060c0888a031215610c9c57600080fd5b8735965060208801359550604088013567ffffffffffffffff80821115610cc257600080fd5b818a0191508a601f830112610cd657600080fd5b813581811115610ce557600080fd5b8b60208260051b8501011115610cfa57600080fd5b602083019750809650505050610d1260608901610c3c565b925060808801359150610d2760a08901610c76565b905092959891949750929550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215610d7657600080fd5b610d7f82610c3c565b9392505050565b6101008101610e01828473ffffffffffffffffffffffffffffffffffffffff80825116835280602083015116602084015262ffffff60408301511660408401528060608301511660608401526080820151608084015260a082015160a084015260c082015160c08401528060e08301511660e0840152505050565b92915050565b600060208284031215610e1957600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015610e6157610e61610e20565b500390565b60005b83811015610e81578181015183820152602001610e69565b83811115610e90576000848401525b50505050565b60008451610ea8818460208901610e66565b60609490941b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000169190930190815260e89190911b7fffffff000000000000000000000000000000000000000000000000000000000016601482015260170192915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610f3e57610f3e610e20565b5060010190565b60008351610f57818460208801610e66565b60609390931b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000169190920190815260140192915050565b6000815160a0845280518060a0860152610fb08160c0870160208501610e66565b73ffffffffffffffffffffffffffffffffffffffff602085015116602086015260408401516040860152606084015160608601526080840151608086015260c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168601019250505092915050565b602081526000610d7f6020830184610f8f565b60008251611048818460208701610e66565b9190910192915050565b60006020828403121561106457600080fd5b8151610d7f81610c6556fea2646970667358221220d1b71d8a70e6d50c1af7af0e3d7803bf01c86d5933b03688b9b21e92f3095ef764736f6c634300080d0033";

type UniswapV3AdapterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniswapV3AdapterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniswapV3Adapter__factory extends ContractFactory {
  constructor(...args: UniswapV3AdapterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UniswapV3Adapter> {
    return super.deploy(router, overrides || {}) as Promise<UniswapV3Adapter>;
  }
  override getDeployTransaction(
    router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(router, overrides || {});
  }
  override attach(address: string): UniswapV3Adapter {
    return super.attach(address) as UniswapV3Adapter;
  }
  override connect(signer: Signer): UniswapV3Adapter__factory {
    return super.connect(signer) as UniswapV3Adapter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV3AdapterInterface {
    return new utils.Interface(_abi) as UniswapV3AdapterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV3Adapter {
    return new Contract(address, _abi, signerOrProvider) as UniswapV3Adapter;
  }
}