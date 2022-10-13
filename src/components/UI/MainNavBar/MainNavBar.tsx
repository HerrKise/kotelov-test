import "./MainNavBar.sass";
import AppsIcon from "@mui/icons-material/Apps";
import ReplyIcon from "@mui/icons-material/Reply";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const MainNavBar = () => {
    return (
        <nav className="header__main-navbar">
            <div className="header__group-left">
                <button className="header__btn-apps">
                    <AppsIcon className="apps-icon" fontSize="small" />
                </button>
                <button className="header__btn-back">
                    <ReplyIcon className="apps-icon" fontSize="small" />
                </button>
                <button className="header__btn-tab">Просмотр</button>
                <button className="header__btn-tab">Управление</button>
            </div>
            <div className="header__group-right">
                <div className="header__avatar-img">
                    <img
                        src="https://img.hhcdn.ru/photo/692031782.png?t=1665674849&h=0GkanIAyOV0yW1gj691AQA"
                        alt="avatar"
                    />
                </div>

                <button className="header__btn-expand-more">
                    <p>Блинов Кирилл</p>
                    <ExpandMoreIcon className="expand-more-icon" />
                </button>
            </div>
        </nav>
    );
};

export default MainNavBar;
