import logoP1 from "../../assets/images/settings/logoP1.png";
import logoP2 from "../../assets/images/settings/logoP2.png";
import background from "../../assets/images/general/background.jpg";

const UserAgreement = () => {
    return (
        <div className="user-agreement">
            <div className="user-agreement__header">
                <div className="user-agreement__header__logo">
                    <img src={logoP2} alt="logo-part-2" />
                    <img src={logoP1} alt="logo-part-1" />
                </div>
            </div>
            <div className="user-agreement__container" dir="rtl">
                <div className="user-agreement__container__agreement">
                    <h3 className="user-agreement__container__agreement__title">הסכם משתמש</h3>
                    <p className="user-agreement__container__agreement__subtitle">רישיון שימוש באפליקציה SugarBit</p>
                    <p className="user-agreement__container__agreement__text">אנא קראו הסכם זה בקפידה לפני התקנה ו/או שימוש באפליקציה:</p>
                    <p className="user-agreement__container__agreement__text">חשוב לציין ולהדגיש אפליקציית SugarBit הינה כלי עזר למעקב וניהול סוכרת. השימוש באפליקציה אינו מחליף בשום מקרה ייעוץ עם רופא/דיאטאנית או צוות רפואי אחר ואינו בא במקום שיקול הדעת הרפואי ו/או האחראיות האישית של המשתמש. אנו משתדלים להיות מדוייקים ככל שניתן. עם זאת , אין ביכולתנו להבטיח שהתוכן הזמין באפליקציה מדוייק, מלא, אמין, עדכני או חף משגיאות.</p>
                    <p className="user-agreement__container__agreement__subtitle">פתיח</p>
                    <p> על ידי לחיצה על כפתור ״אישור״ או ההתקנה ו/או השימוש ביישום... קרא עוד</p>
                </div>
                <div className="user-agreement__container__button-agreement">
                    <button className="btn-main">אני מאשר/ת הסכם זה</button>
                </div>
            </div>
        </div>
    );
}

export default UserAgreement;