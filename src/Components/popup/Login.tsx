import { useContext, useState } from "react";
import styles from "../../styles/style";
import { profileLogo } from "../../assets";
import { navLinks } from "../../constants";
import Card from "../Card";
import { Button, Input, rem } from "@mantine/core";
import {
  IconAt,
  IconBrandGoogle,
  IconBrandTwitter,
  IconMail,
  IconWallet,
} from "@tabler/icons-react";
import { EurotzContextType } from "../../context/eurotz.type";
import { EuroTzContext } from "../../context/EurotzContext";

const Login = (props: { close: any }) => {
  const { connect } = useContext(EuroTzContext) as EurotzContextType;
  const [email, setEmail] = useState<string>("");

  return (
    <Card extra={"h-full px-8 py-8  flex flex-col justify-center items-center"}>
      <img src={profileLogo} alt="hoobank" className="w-[100px] " />
      <p className="mb-5 mt-2 text-[18px]"> Signin to FMN </p>
      <div className="flex flex-col w-[80%] ">
        <Input
          icon={<IconAt />}
          radius={20}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          placeholder="Your email"
        />
        <button
          className="py-2 rounded-lg cursor-pointer hover:bg-[#f3f3f3]  mt-5 font-poppins rounded-[20px] border-2 text-white rounded-lg cursor-pointer"
          onClick={async () => {
            if (email) {
              connect("email", email);
              props.close();
            }
          }}
        >
          <div className="flex flex-row text-black text-[15] justify-center">
            <IconMail color="black" />
            <p className="ml-5">Connect with email</p>
          </div>{" "}
        </button>

        <button
          className="py-2  rounded-lg cursor-pointer hover:bg-[#f3f3f3] mt-5 font-poppins rounded-[20px] border-2 text-white rounded-lg cursor-pointer"
          onClick={async () => {
            await connect("wallet", "");
            props.close();
          }}
        >
          <div className="flex flex-row text-black text-[15] justify-center">
            <IconWallet color="black" />
            <p className="ml-5">Connect with wallet</p>
          </div>{" "}
        </button>
      </div>
    </Card>
  );
};

export default Login;
