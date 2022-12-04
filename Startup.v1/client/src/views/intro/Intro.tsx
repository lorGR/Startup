import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import professionalHeader from "../../assets/images/logo/professionalHeader.png";
import logoP1 from "../../assets/images/logo/logoP1.png";
import logoP2 from "../../assets/images/logo/logoP2.png";

const Intro = () => {
    return (
        <div className="intro">
            <div className="intro__header">
                <div className="intro__header__logo">
                    <img src={sugarbitHeader} alt="sugar-bit-header" id="header" />
                    <img src={professionalHeader} alt="professional-header" id="professional" />
                </div>
            </div>
            <div className="intro__logo">
                {/* <div className="intro__logo"> */}
                <img src={logoP2} alt="logo-part-2" />
                <img src={logoP1} alt="logo-part-1" />
                {/* </div> */}
            </div>
            <div className="intro__container">
                <button className="btn-main">התחברות</button>
                <button className="btn-main">הרשמה</button>
            </div>
        </div>
    );
}

export default Intro;