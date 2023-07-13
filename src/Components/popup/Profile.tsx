import { useContext, useState } from "react";
import { profileLogo } from "../../assets";
import Card from "../Card";
import { Button, CopyButton, Input, Notification } from "@mantine/core";
import {
    IconAt,
    IconCheck,
    IconLogout,
    IconX,
} from "@tabler/icons-react";
import { EurotzContextType } from "../../context/eurotz.type";
import { EuroTzContext } from "../../context/EurotzContext";
import { IoSave } from "react-icons/io5";

const Profile = (props: { close: any, address: string }) => {
    const { disconnect, notification, setNotification } = useContext(EuroTzContext) as EurotzContextType;
    const [name, setName] = useState<string>("");

    return (
        <Card extra={"h-full px-8 py-8  flex flex-col justify-center items-center"}>
            <img src={profileLogo} alt="hoobank" className="w-[124px] " />
            <p className="mb-5 mt-2 text-[18px]"> My profile </p>
            <div className="flex flex-col w-full ">
                <CopyButton value={props.address} >
                    {({ copied, copy }) => (
                        <Button color={copied ? 'teal' : ''} onClick={copy} className="bg-[#0D297A] rounded-lg rounded-[30px] mb-5">
                            {copied ? 'Copied address' : `${props.address}`}
                        </Button>
                    )}
                </CopyButton>

                <button
                    className="py-2  rounded-lg cursor-pointer hover:bg-[#f3f3f3] mt-5 font-poppins rounded-[20px] border-2 text-white rounded-lg cursor-pointer"
                    onClick={async () => {
                        await disconnect("wallet", "");
                        props.close();
                    }}
                >
                    <div className="flex flex-row text-black text-[15] justify-center">
                        <IconLogout color="black" size={25} />
                        <p className="ml-5">disconnect</p>
                    </div>{" "}
                </button>
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
        </Card>
    );
};

export default Profile;
