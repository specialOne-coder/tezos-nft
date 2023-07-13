import { createContext, useEffect, useState } from "react";
import {
  EuroTzProviderProps,
  EurotzContextType,
  Notif,
} from "./eurotz.type";
import { magic } from "../App";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import Cookies from "js-cookie";
import { InteractTezos } from "./tezos-api/interact.tezos";


export const EuroTzContext = createContext<EurotzContextType | null>(null);

let rpc = "https://rpc.tzkt.io/ghostnet";
const tezos = new InteractTezos();

const EuroTzProvider = ({ children }: EuroTzProviderProps) => {
  const [magicPkh, setMagicPkh] = useState<string>("");
  const [beaconPkh, setBeaconPkh] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState<Notif>({} as Notif);
  const [userMetadata, setUserMetadata] = useState({});
  const [bankAccounts, setBankAccounts] = useState<any>([]);
  const [userBonds, setUserBonds] = useState<any>([]);
  const [publicSales, setPublicSales] = useState<any>([]);
  const [privateSales, setPrivateSales] = useState<any>([]);
  const [userTransactions, setUserTransactions] = useState<any>([]);
  const [userBalance, setUserBalance] = useState<string>();
  const [profile, setProfile] = useState<any>({});
  const [userNfts, setUserNfts] = useState<any>([]);
  const Tezos = new TezosToolkit(rpc);
  const wallet = new BeaconWallet({ name: "Euro tz" });

  const connect = async (type: string, email: string) => {
    switch (type) {
      case "email":
        await magic.auth.loginWithEmailOTP({ email });
        setIsLoggedIn(true);
        break;
      case "wallet":
        const activeAccount = await wallet.client.getActiveAccount();
        if (activeAccount) {
          console.log("Pk =>", activeAccount);
          console.log("Already connected:", activeAccount.address);
          setBeaconPkh(activeAccount.address);
          return activeAccount;
        } else {
          Tezos.setWalletProvider(wallet);
          try {
            console.log("Requesting permissions...");
            const permissions = await wallet.client.requestPermissions();
            console.log("Got permissions:", permissions.address);
            setBeaconPkh(permissions.address);
          } catch (error) {
            console.log("Got error:", error);
          }
        }
        break;
      default:
        break;
    }
  };

  const disconnect = async (type: string, email: string) => {
    switch (type) {
      case "email":
        await magic.auth.loginWithEmailOTP({ email });
        setMagicPkh("");
        setIsLoggedIn(false);
        break;
      case "wallet":
        let disco = await wallet.disconnect();
        console.log("disco =>", disco);
        setBeaconPkh("");
        break;
      default:
        break;
    }
  };

  const mintNFT = async () => {
    let initial = await tezos.feelings();
    console.log("initial =>", initial);
    
    let attributes = [
      {
        "name": "readinessScore",
        "value": `${initial.readinessScore}`
      },
      {
        "name": "sleepScore",
        "value": `${initial.sleepScore}`
      },
      {
        "name": "temperatureDelta",
        "value": `${initial.temperatureDelta}`
      },
      {
        "name": "Last Visit",
        "value": new Date().toLocaleDateString()
      }
    ]
    console.log("initial =>", attributes);

    let formatParams = {
      userAddress: beaconPkh ? beaconPkh : magicPkh,
      attributes: attributes,
    }
    console.log("formatParams =>", formatParams);
    if (!formatParams) return;
    let finalResponse = await tezos.apiMint(formatParams);
    finalResponse
      ? finalResponse.status == 200
        ? setNotification({
          type: "Sucess",
          message: "Mint tx success",
        })
        : setNotification({
          type: "Error",
          message: "Tx fail: " + finalResponse,
        })
      : setNotification({
        type: "Error",
        message: "Tx fail: " + finalResponse,
      });
    console.log("Final resp =>", finalResponse);
  }

  const getUserNfts = async (address: string) => {
    let userNfts = await tezos.userNfts(address);
    setUserNfts(userNfts);
  };

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    const checkMagicLogin = async () => {
      const isMagicLoggedIn = await magic.user.isLoggedIn();
      setIsLoggedIn(isMagicLoggedIn);
      if (isMagicLoggedIn) {
        console.log("magic.taquito", magic);
        const publicAddress = (await magic.taquito.getPublicKey()).pkh;
        console.log("publicAddress", publicAddress);
        setMagicPkh(publicAddress);
        setUserMetadata(await magic.user.getInfo());
        console.log("userMetadata", userMetadata);
        console.log("publicAddress", publicAddress);
        await getUserNfts(publicAddress);
      }
    };
    // magic.user.isLoggedIn().then(async (magicIsLoggedIn) => {
    //   setIsLoggedIn(magicIsLoggedIn);
    //   if (magicIsLoggedIn) {
    //     const publicAddress = (await magic.taquito.getPublicKey()).pkh;
    //     console.log("publicAddress", publicAddress);
    //     setMagicPkh(publicAddress);
    //     setUserMetadata(await magic.user.getInfo());
    //     console.log("userMetadata", userMetadata);
    //     console.log("publicAddress", publicAddress);
    //   }
    // });
    checkMagicLogin();
  }, [isLoggedIn]);

  useEffect(() => {
    async function check() {
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        console.log("Already connected:", activeAccount.address);
        setBeaconPkh(activeAccount.address);
        await getUserNfts(activeAccount.address);
      }
    }
    check();
  }, []);

  return (
    <EuroTzContext.Provider
      value={{
        connect,
        disconnect,
        userNfts,
        magicPkh,
        notification,
        setNotification,
        beaconPkh,
        getUserNfts,
        mintNFT,
      }}
    >
      {children}
    </EuroTzContext.Provider>
  );
};

export default EuroTzProvider;
