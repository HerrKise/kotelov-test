import MainNavBar from "../MainNavBar/MainNavBar";
import SecondaryNavBar from "../SecondaryNavBar/SecondaryNavBar";
import "./Header.sass";
const Header = () => {
    return (
        <header className="header">
            <MainNavBar />
            <SecondaryNavBar />
        </header>
    );
};

export default Header;
