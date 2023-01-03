import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import MenuItem from "../menuItem/MenuItem";

import home from "../../assets/images/navbar/home.png";
import calendar from "../../assets/images/navbar/calendar.png";
import clock from "../../assets/images/navbar/clock.png";
import report from "../../assets/images/navbar/report.png";
import settings from "../../assets/images/navbar/settings.png";
import blood from "../../assets/images/navbar/blood.png";
import share from "../../assets/images/navbar/share.png";
import info from "../../assets/images/navbar/info.png";

const Menu = () => {
  return (
    <div className="menu-screen">
      <div className="menu__logo">
        <img src={sugarbitHeader} alt="sugar-bit-header" id="header" />
      </div>
      <div className="menu__items">
        <div className="menu__row">
          <MenuItem link="/calendar" text="יומן" icon={calendar} />
          <MenuItem link="/home" text="בית" icon={home} />

        </div>
        <div className="menu__row">
          <MenuItem link="" text="תזכורן" icon={clock} />
          <MenuItem link="" text="דוחות" icon={report} />
        </div>
        <div className="menu__row">
          <MenuItem link="" text="הגדרות" icon={settings} />
          <MenuItem link="" text="שתף" icon={share} />

        </div>
        <div className="menu__row">
          <MenuItem link="" text="מד סוכר" icon={blood} />
          <MenuItem link="" text="הדרכות" icon={info} />
        </div>
      </div>
    </div>
  )
}

export default Menu;