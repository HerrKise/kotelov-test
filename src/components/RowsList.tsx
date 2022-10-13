import { useAppSelector } from "../hooks/redux";
import { TreeDataItem } from "../types/rows";
import RowItem from "./RowItem";
import "./RowsList.sass";
import TableHeader from "./UI/TableHeader/TableHeader";

const RowsList: React.FC = () => {
    const state = useAppSelector((state) => state);
    const stateStorage = [...state.rows.rows];

    const rowsTree: TreeDataItem[] = [];
    stateStorage.map((r) => {
        rowsTree.push({ id: r.id, parentId: r.parent });
    });
    rowsTree.reduce((a: TreeDataItem[], c) => {
        c.children = rowsTree.filter((r) => r.parentId === c.id);
        a.push(c);
        return a;
    }, []);
    const nullRowsTree = rowsTree.filter((r) => r.parentId === null);

    return (
        <main className="main">
            <TableHeader />
            {nullRowsTree.map((row) => (
                <RowItem
                    id={row.id}
                    parentId={row.parentId}
                    children={row.children}
                    key={row.id}
                />
            ))}
        </main>
    );
};

export default RowsList;
