import sugarbitHeader from "../../assets/images/logo/sugarbitHeader.png";
import professionalHeader from "../../assets/images/logo/professionalHeader.png";
import logoP1 from "../../assets/images/logo/logoP1.png";
import logoP2 from "../../assets/images/logo/logoP2.png";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlice";

const Intro = () => {
    const navigate = useNavigate();

    const user = useAppSelector(userSelector);

    user !== undefined && navigate("/home");
    
    return (
        <div className="intro">
            <div className="intro__header">
                <div className="intro__header__logo">
                    <img src={sugarbitHeader} alt="sugar-bit-header" id="header" />
                    <img src={professionalHeader} alt="professional-header" id="professional" />
                </div>
            </div>
            <div className="intro__logo">
                <img src={logoP2} alt="logo-part-2" />
                <img src={logoP1} alt="logo-part-1" />
            </div>
            <div className="intro__container">
                <button className="btn-main" onClick={() => navigate("/login")}>התחברות</button>
                <button className="btn-main" onClick={() => navigate("/register")}>הרשמה</button>
            </div>
        </div>
    );
}

export default Intro;