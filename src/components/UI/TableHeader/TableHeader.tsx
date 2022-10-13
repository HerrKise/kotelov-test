import "./TableHeader.sass";

const TableHeader = () => {
    return (
        <div className="main__table-header">
            <div className="main__column-header">Уровень</div>
            <div className="main__column-header">Наименование работ</div>
            <div className="main__column-header">Ед. изм.</div>
            <div className="main__column-header">Количество</div>
            <div className="main__column-header">Цена за ед.</div>
            <div className="main__column-header">Стоимость</div>
        </div>
    );
};

export default TableHeader;
