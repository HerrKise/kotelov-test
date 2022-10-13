import "./SecondaryNavBar.sass";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const SecondaryNavBar = () => {
    return (
        <nav className="header__secondary-navbar">
            <div className="header__project-section">
                <div className="header__project-name">
                    <p>Название проекта</p>
                    <p className="header__project-abbreviation">Аббревиатура</p>
                </div>
                <button className="header__btn-expand-project">
                    <ExpandMoreIcon
                        className="expand-more-icon"
                        fontSize="small"
                    />
                </button>
            </div>
            <div className="header__section-tab">
                <p className="header__tab-name">Строительно-монтажные работы</p>
            </div>
        </nav>
    );
};

export default SecondaryNavBar;
