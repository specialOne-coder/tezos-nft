import { useContext, useEffect, useState } from "react";
import styles from "../../styles/style";
import {art } from "../../assets";
import { useDisclosure } from "@mantine/hooks";
import { rem, Modal, Loader, Notification } from "@mantine/core";
import Login from "../popup/Login";
import { EurotzContextType } from "../../context/eurotz.type";
import { EuroTzContext } from "../../context/EurotzContext";
import { IconCheck, IconCurrencyBitcoin, IconX } from "@tabler/icons-react";

const Welcome = () => {
  const [openedTg, { open, close }] = useDisclosure(false);

  const { magicPkh, beaconPkh, mintNFT, notification, setNotification } =
    useContext(EuroTzContext) as EurotzContextType;
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("This will run every 5 seconds!");
  //     console.log("beaconPkh =>", beaconPkh);
  //     beaconPkh.length > 0 ? getUserBalance(beaconPkh) : getUserBalance(magicPkh);
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const mint = async () => {
    setLoading(true);
    await mintNFT();
  }

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col`}
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
            <Login close={close} />
          </div>
        </Modal>
      </>
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6`}
      >
          <img src={art} className="w-[50%]" />{" "}
        <p
          className={`${styles.paragraph} justify-center items-center max-w-[470px] `}
        >
          A live interactive simulation and generative self-portrait that explores methods of care to online beings and within online spaces.
        </p>
        {magicPkh || beaconPkh ? (
          <>
            <div className="flex mt-8">
              <button
                className="py-4 px-6 mt-10 font-poppins font-medium text-[18px] text-primary bg-white rounded-[10px] outline-none text-black"
                onClick={
                  async () => {
                    await mint()
                    setLoading(false)
                  }
                }
              >
                {" "}
                {loading ? <Loader size={20} /> : "Mint NFT"}
              </button>
            </div>
          </>
        ) : (
          <button
            className="py-4 px-6 mt-10 font-poppins font-medium text-[18px] text-black bg-white rounded-[10px] outline-none"
            onClick={open}
          >
            {" "}
            Get Started
          </button>
        )}
         {notification.type ? (
        <>
          {notification.type.includes("Error") ? (
            <Notification
              icon={<IconX size="1.1rem" />}
              color="red"
              mt={20}
              w="50%"
              title="Error"
              onClick={() => {
                setNotification({ type: "", message: "" });
              }}
            >
              {notification.message}
            </Notification>
          ) : (
            <Notification
              icon={<IconCheck size="1.1rem" />}
              color="teal"
              mt={20}
              w="50%"
              title="Success"
              onClick={() => {
                setNotification({ type: "", message: "" });
              }}
            >
              {notification.message}
            </Notification>
          )}
        </>
      ) : (
        ""
      )}
      </div>
     
    </section>
  );
};

export default Welcome;
