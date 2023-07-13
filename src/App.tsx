import styles from "./styles/style";
import { Navbar, Footer } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  DVPage,
  HomePage,
} from "./pages";
import { Magic } from "magic-sdk";
import { TaquitoExtension } from "@magic-ext/taquito";
import { OAuth } from "oauth";
import { useContext } from "react";
import { EuroTzContext } from "./context/EurotzContext";
import { EurotzContextType } from "./context/eurotz.type";

export const magic = new Magic(import.meta.env.VITE_MAGIC, {
  extensions: [
    new TaquitoExtension({
      rpcUrl: import.meta.env.VITE_RPC,
    }),
  ],
});

export const consumer = new OAuth(
  import.meta.env.VITE_OPENBANK_API + "/oauth/initiate",
  import.meta.env.VITE_OPENBANK_API + "/oauth/token",
  `${import.meta.env.VITE_CONSUMER_KEY}`,
  `${import.meta.env.VITE_CONSUMER_SECRET}`,
  "1.0", //rfc oauth 1.0, includes 1.0a
  `${import.meta.env.VITE_OPENBANK_REDIRECT_URL}`,
  "HMAC-SHA1",
  0
);

function App() {
  const { magicPkh, beaconPkh } = useContext(
    EuroTzContext
  ) as EurotzContextType;
  return (
    <div className="w-full">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/myNfts" element={<DVPage />} />
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </Router>
        </div>
      </div>
      <div
        className={`bg-primary mt-10 ${styles.paddingX} ${styles.flexCenter}`}
      >
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
