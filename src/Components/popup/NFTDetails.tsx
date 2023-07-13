import { useContext, useState } from "react";
import styles from "../../styles/style";
import { eutz, logo, blueLogo, menu, profileLogo } from "../../assets";
import { navLinks } from "../../constants";
import Card from "../Card";
import { Button, Input, rem } from "@mantine/core";
import {
    IconCoinEuro,
    IconCurrencyEuro,
    IconGrowth,
    IconTruck,
} from "@tabler/icons-react";
import { EurotzContextType } from "../../context/eurotz.type";
import { EuroTzContext } from "../../context/EurotzContext";
import { MdDateRange, MdPermIdentity, MdRunCircle, MdSell } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiDetour } from "react-icons/gi";
import { BiSleepy } from "react-icons/bi";
import { IoIdCard } from "react-icons/io5";

const BondDetails = (props: { close: any, metadata: any, tokenId: string }) => {
    const { connect } = useContext(EuroTzContext) as EurotzContextType;

    console.log("Bond Details: ", props.metadata);
    let jsonMetadata = JSON.parse(props.metadata.attributes);
    console.log("Nft Details Metadata: ", jsonMetadata);

    console.log("Nft  Metadata infos readi : ", jsonMetadata.readinessScore);
    

    return (
        <Card extra={"h-full px-8 py-8  flex flex-col justify-center items-center"}>
            <img src={profileLogo} alt="hoobank" className="w-[124px] " />
            <p className="mb-5 mt-4 text-[18px]"> Nft Details </p>
            <div className="flex flex-col w-full  ">
                <div className="flex flex-row justify-between bg-[#4566B5] px-4 py-2 rounded-[16px] mb-2">
                    <div className="flex">
                        <IoIdCard className="text-white" size={25} />
                        <p className="text-[16px] text-white font-poppins font-bold text-center ml-2  ">Token Id</p>
                    </div>
                    <p className="text-center text-white text-[16px]">
                        {props.tokenId}
                    </p>
                </div>
                <div className="flex flex-row justify-between bg-[#4566B5] px-4 py-2 rounded-[16px] mb-2">
                    <div className="flex">
                        <MdRunCircle className="text-white" size={25} />
                        <p className="text-[16px] text-white font-poppins font-bold text-center ml-2  ">Readiness</p>
                    </div>
                    <p className="text-center text-white text-[16px]">
                        {jsonMetadata.readinessScore}
                    </p>
                </div>
                <div className="flex flex-row justify-between bg-[#4566B5] px-4 py-2 rounded-[16px] mb-2">
                    <div className="flex">
                        <BiSleepy className="text-white" size={25} />
                        <p className="text-[16px] text-white font-poppins font-bold text-center ml-2  ">Sleep Score</p>
                    </div>
                    <p className="text-center text-white text-[16px]">
                        {jsonMetadata.sleepScore}
                    </p>
                </div>
                <div className="flex flex-row justify-between bg-[#4566B5] px-4 py-2 rounded-[16px] mb-2">
                    <div className="flex">
                        <FaTemperatureHigh className="text-white" size={25} />
                        <p className="text-[16px] text-white font-poppins font-bold text-center ml-2  ">Temperature Score</p>
                    </div>
                    <p className="text-center text-white text-[16px]">
                        {jsonMetadata.temperatureDelta}
                    </p>
                </div>
                <div className="flex flex-row justify-between bg-[#4566B5] px-4 py-2 rounded-[16px] mb-2">
                    <div className="flex">
                        <GiDetour className="text-white" size={25} />
                        <p className="text-[16px] text-white font-poppins font-bold text-center ml-2  ">Last visit</p>
                    </div>
                    <p className="text-center text-white text-[16px]">
                        {jsonMetadata['Last visit']}
                    </p>
                </div>


            </div>
        </Card>
    );
};

export default BondDetails;
