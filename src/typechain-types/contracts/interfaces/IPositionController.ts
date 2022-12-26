/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace OrderTypes {
  export type OrderParamsStruct = {
    owner: PromiseOrValue<string>;
    strategy: PromiseOrValue<string>;
    from: PromiseOrValue<string>;
    to: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    interval: PromiseOrValue<BigNumberish>;
    slippage: PromiseOrValue<BigNumberish>;
    priceLimit: PromiseOrValue<BigNumberish>;
    firstTime: PromiseOrValue<BigNumberish>;
    endTime: PromiseOrValue<BigNumberish>;
    buyNow: PromiseOrValue<boolean>;
    params: PromiseOrValue<BytesLike>;
  };

  export type OrderParamsStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean,
    string
  ] & {
    owner: string;
    strategy: string;
    from: string;
    to: string;
    amount: BigNumber;
    interval: BigNumber;
    slippage: BigNumber;
    priceLimit: BigNumber;
    firstTime: BigNumber;
    endTime: BigNumber;
    buyNow: boolean;
    params: string;
  };
}

export interface IPositionControllerInterface extends utils.Interface {
  functions: {
    "autoMatchPosition(bytes32,address,uint256)": FunctionFragment;
    "createPosition((address,address,address,address,uint256,uint128,uint256,uint256,uint256,uint256,bool,bytes))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "autoMatchPosition" | "createPosition"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "autoMatchPosition",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createPosition",
    values: [OrderTypes.OrderParamsStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "autoMatchPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createPosition",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IPositionController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPositionControllerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    autoMatchPosition(
      positionId: PromiseOrValue<BytesLike>,
      exchange: PromiseOrValue<string>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createPosition(
      order: OrderTypes.OrderParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  autoMatchPosition(
    positionId: PromiseOrValue<BytesLike>,
    exchange: PromiseOrValue<string>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createPosition(
    order: OrderTypes.OrderParamsStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    autoMatchPosition(
      positionId: PromiseOrValue<BytesLike>,
      exchange: PromiseOrValue<string>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createPosition(
      order: OrderTypes.OrderParamsStruct,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    autoMatchPosition(
      positionId: PromiseOrValue<BytesLike>,
      exchange: PromiseOrValue<string>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createPosition(
      order: OrderTypes.OrderParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    autoMatchPosition(
      positionId: PromiseOrValue<BytesLike>,
      exchange: PromiseOrValue<string>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createPosition(
      order: OrderTypes.OrderParamsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
