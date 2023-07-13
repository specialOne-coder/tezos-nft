import { useState, Component, useContext, useEffect } from "react";
import styles from "../styles/style";
import { Welcome } from "../Components";
import { EurotzContextType } from "../context/eurotz.type";
import { EuroTzContext } from "../context/EurotzContext";

const HomePage = () => {

  const {
    magicPkh,
    connect,
    beaconPkh,
  } = useContext(EuroTzContext) as EurotzContextType;


  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Welcome />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
