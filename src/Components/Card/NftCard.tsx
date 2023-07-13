import { useContext, useState } from "react";
import Card from ".";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { EuroTzContext } from "../../context/EurotzContext";
import { EurotzContextType } from "../../context/eurotz.type";
import { Loader, Modal, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BondDetails from "../popup/NFTDetails";

const NftCard = (props: {
  tokenId: number;
  image: string;
  title: string;
  metadata: any;
}) => {

  const [openedTg, { open, close }] = useDisclosure(false);
  const {
    title,
    image,
    tokenId,
    metadata
  } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}
    >
      <>
        <Modal
          opened={openedTg}
          onClose={close}
          size="md"
          centered
          radius={rem(20)}
        >
          <div className="">
            <BondDetails close={close} metadata={metadata} tokenId={`${tokenId}`} />
          </div>
        </Modal>
      </>

      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
        </div>

        <div className=" flex items-center justify-center px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2 w-full">
            <p className="text-lg font-bold text-center text-black">
              {" "}
              {title}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between md:flex-col w-full">
          <div className="flex flex-row w-full">
            <button
              className={`linear w-full mt-4 rounded-[15px] mr-2 bg-[gray] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700`}
              onClick={async () => {
                open();
              }}
            >
              Details
            </button>
            <a href={`https://hackart-production.up.railway.app/view/?tokenId=${tokenId}`} target="_blank" className="linear w-full mt-4 rounded-[15px] bg-black px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700">
              <button
                className={`linear w-full rounded-[15px] bg-black text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700`}
                onClick={async () => {
                  // await cancelOrBuy();
                  // setLoading(false);
                }}
              >
                Visit
              </button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
