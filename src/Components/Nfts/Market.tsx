import { useContext, useEffect } from "react";
import { NFT } from "../../assets";
import { EuroTzContext } from "../../context/EurotzContext";
import NftCard from "../Card/NftCard";
import { EurotzContextType } from "../../context/eurotz.type";

const Marketplace = (props: { nfts: any, user: string }) => {


  return (
    <section id="home" className={`flex  flex-col`}>
      {/* NFt Header */}

      {/* NFTs trending card */}
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4 mb-10 w-full">
        {props.nfts ?
          props.nfts.length > 0
            ? props.nfts.map((nft: any, index: number) =>
              <NftCard
                key={index}
                title={`${nft.metadata.name} #${nft.tokenId}`}
                tokenId={nft.tokenId}
                image={nft.metadata.artifactUri}
                metadata={nft.metadata}
              />
            )
            : <p className="text-white text-[20px] w-full text-center">Loading ...</p>
          : <p className="text-white text-[20px] w-full text-center">No nfts yet</p>
        }
      </div>
    </section>
  );
};

export default Marketplace;
