import classes from "./HamburgerMenu.module.css";
import bokstavboks from "./logos/bokstavboks.svg";
import ordlabyrint from "./logos/ordlabyrint.svg";
import ordle from "./logos/ordle.svg";
import spoke from "./logos/spoke.svg";
import stavehumle from "./logos/stavehumle.svg";
import { Link } from "react-router";
import { AppId, usePwa } from "../PwaContainer";

const APPS: Record<AppId, { logo: string; url: string }> = {
  bokstavboks: { logo: bokstavboks, url: "https://bokstavboks.no" },
  ordkart: { logo: "", url: "https://ordkart.no" },
  ordlabyrint: { logo: ordlabyrint, url: "https://ordlabyrint.no" },
  ordle: { logo: ordle, url: "https://ordle-app.no" },
  ordtorden: { logo: "", url: "https://ordtorden.no" },
  spoke: { logo: spoke, url: "https://spøke.no" },
  stavehumle: { logo: stavehumle, url: "https://stavehumle.no" },
};

export const OtherApps = () => {
  const { appId } = usePwa();

  return (
    <div className={classes.apps}>
      {Object.entries(APPS)
        .filter(([id]) => id !== appId)
        .filter(([_id, { logo }]) => !!logo)
        .map(([appId, { logo, url }]) => (
          <Link key={appId} to={url} target={appId}>
            <img src={logo} alt={`ikon til ${appId}`} />
          </Link>
        ))}
    </div>
  );
};
