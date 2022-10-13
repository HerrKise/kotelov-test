import { useAppSelector } from "../hooks/redux";
import { RowData, TreeDataItem } from "../types/rows";
import RowItemEditMode from "./RowItemEditMode";
import RowItemReadMode from "./RowItemReadMode";
import FolderIcon from "@mui/icons-material/Folder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import "./RowItem.sass";

const RowItem: React.FC<TreeDataItem> = (props: TreeDataItem) => {
    const state = useAppSelector((state) => state);
    const stateStorage = [...state.rows.rows];
    const currentEditingId = useAppSelector(
        (state) => state.rows.currentEditingId
    );
    const row = useAppSelector((state) =>
        state.rows.rows.find((r) => r.id === props.id)
    );
    const editingRow = useAppSelector((state) =>
        state.rows.rows.find((r) => r.id === currentEditingId)
    );

    const updateStorage = (row: RowData) => {
        stateStorage.push(row);
    };
    const iconWidth = 16.67;
    let iconType = null;
    if (row?.type === "level") {
        if (row.parent === null) {
            iconType = <FolderIcon fontSize="small" className="level-icon" />;
        } else {
            iconType = (
                <FolderIcon fontSize="small" className="sublevel-icon" />
            );
        }
    } else {
        iconType = <TextSnippetIcon fontSize="small" className="row-icon" />;
    }
    const hasChildren = props.children && props.children?.length > 0;
    const levelOfNesting = () => {
        let count = 0;
        if (row?.parent === null) return count;
        let currentParentIndex = stateStorage.findIndex(
            (v) => v.id === row?.id
        );
        if (currentParentIndex === -1) return count;
        do {
            const currentParent = stateStorage[currentParentIndex];

            if (currentParent.parent !== null) {
                count++;
                currentParentIndex = stateStorage.findIndex(
                    (v) => v.id === currentParent.parent
                );
                continue;
            }

            break;
        } while (currentParentIndex !== -1);
        return count;
    };
    const iconMargin = levelOfNesting() * iconWidth;
    return (
        <>
            {currentEditingId === props.id
                ? editingRow &&
                  props.children && (
                      <RowItemEditMode
                          children={props.children}
                          iconWidth={iconWidth}
                          hasChildren={hasChildren}
                          margin={iconMargin}
                          icon={iconType}
                          row={editingRow}
                          stateStorage={stateStorage}
                      />
                  )
                : row &&
                  props.children && (
                      <RowItemReadMode
                          children={props.children}
                          iconWidth={iconWidth}
                          hasChildren={hasChildren}
                          margin={iconMargin}
                          icon={iconType}
                          row={row}
                          stateStorage={stateStorage}
                          onUpdate={updateStorage}
                      />
                  )}

            {props.children &&
                props.children.length > 0 &&
                props.children.map((child) => (
                    <RowItem {...child} key={child.id} />
                ))}
        </>
    );
};

export default RowItem;
