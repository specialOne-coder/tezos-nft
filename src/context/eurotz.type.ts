export type EurotzContextType = {
    magicPkh: string;
    beaconPkh: string;
    connect: (type: string, wallet: string) => void;
    disconnect: (type: string, wallet: string) => void;
    notification: Notif;
    setNotification: (notif: Notif) => void;
    userNfts: any[];
    getUserNfts: (address: string) => void;
    mintNFT: () => any;
};

export interface EuroTzProviderProps {
    children: React.ReactNode
}


export type Notif = {
    type: string;
    message: string;
}