import "./SideBar.sass";
import DashboardIcon from "@mui/icons-material/Dashboard";

const SideBar = () => {
    const mockNames = [
        "По проекту",
        "Объекты",
        "РД",
        "МТО",
        "СМР",
        "График",
        "МиМ",
        "Рабочие",
        "Капложения",
        "Бюджет",
        "Финансирование",
        "Панорамы",
        "Камеры",
        "Поручения",
        "Контрагенты"
    ];
    return (
        <nav className="navbar">
            {mockNames.map((name) => (
                <button className="navbar__button">
                    <DashboardIcon className="dashboard-icon" />
                    <p>{name}</p>
                </button>
            ))}
        </nav>
    );
};

export default SideBar;
