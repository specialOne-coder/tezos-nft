import styles from "../styles/style";
import { eutz, eutzBlue } from "../assets";
import Marketplace from "../Components/Nfts/Market";
import { useContext, useEffect } from "react";
import { EuroTzContext } from "../context/EurotzContext";
import { EurotzContextType } from "../context/eurotz.type";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

const DVPage = () => {
  const { magicPkh, beaconPkh, notification, setNotification, userNfts, getUserNfts } = useContext(
    EuroTzContext
  ) as EurotzContextType;


  // useEffect(() => {
  //   getPublicSales();
  //   getPrivateSales();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getUserNfts(beaconPkh ? beaconPkh : magicPkh);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div
          className={`${styles.flexCenter} justify-center items-center w-full flex flex-col`}
        >
          <p className="text-[30px] text-white"> My Nfts </p>
          <br className="sm:block hidden" />{" "}
        </div>
        <div className="mt-8 w-full text-white">
          <Marketplace nfts={userNfts} user={beaconPkh ? beaconPkh : magicPkh} />
        </div>
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

export default DVPage;
