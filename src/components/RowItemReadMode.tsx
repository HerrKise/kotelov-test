import { useState } from "react";
import { ReadComponentProps, NewRowData, RowData } from "../types/rows";
import { recalculation } from "../utils/recalculation";
import { useAppDispatch } from "../hooks/redux";
import {
    updateEditingId,
    addRow,
    rowEdited
} from "../store/reducers/rowsReducer";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const RowItemReadMode: React.FC<ReadComponentProps> = (
    props: ReadComponentProps
) => {
    const [isHover, setIsHover] = useState(false);

    const dispatch = useAppDispatch();
    const {
        row,
        stateStorage,
        onUpdate,
        icon,
        margin,
        hasChildren,
        iconWidth,
        children
    } = props;
    const clickHandler = (e: React.MouseEvent, editingId: number) => {
        if (e.detail === 2) {
            console.log(e);
            dispatch(updateEditingId(editingId));
        }
    };

    function saveRow(rowData: NewRowData, storage: RowData[]) {
        const index = Math.max(...storage.map((v) => v.id), 0) + 1;
        const row: RowData = { id: index, ...rowData };

        onUpdate(row);
        return {
            current: row,
            changed: recalculation(row.parent, storage)
        };
    }

    const addNewRow = (parentId: number | null, type: "level" | "row") => {
        const initialRowData: NewRowData = {
            title: "Новая строка",
            unit: "",
            quantity: 0,
            unitPrice: 0,
            price: 0,
            parent: parentId,
            type: type
        };
        const { current, changed } = saveRow(initialRowData, stateStorage);
        dispatch(updateEditingId(current.id));
        dispatch(addRow(current));
        if (changed.length > 0) {
            changed.map((changedRow) => dispatch(rowEdited(changedRow)));
        }
    };
    console.log(icon);
    return (
        <div key={row.id} className="main__table-row">
            <div>
                {row.parent !== null && (
                    <div
                        className="dash"
                        style={{ left: `${4.5 + margin}px` }}
                    ></div>
                )}
                <div
                    className={`main__table-btns ${isHover && "hover"}`}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    style={{ marginLeft: `${12 + margin}px` }}
                >
                    {row.type === "level" ? (
                        <>
                            <button
                                onClick={() => addNewRow(row.parent, row.type)}
                                className="create-button"
                            >
                                {icon}
                            </button>
                            {isHover && (
                                <>
                                    <button
                                        onClick={() =>
                                            addNewRow(row.id, row.type)
                                        }
                                        className="create-button"
                                    >
                                        <CreateNewFolderIcon
                                            fontSize="small"
                                            className="create-sublevel-icon"
                                        />
                                    </button>
                                    <button
                                        onClick={() => addNewRow(row.id, "row")}
                                        className="create-button"
                                    >
                                        <TextSnippetIcon
                                            fontSize="small"
                                            className="row-icon"
                                        />
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <>{icon}</>
                    )}
                    {hasChildren && (
                        <div
                            className="vertical-line"
                            style={{
                                left: `${12.5 + margin + iconWidth / 2}px`,
                                height: `${
                                    55.135 + (children.length - 1) * 61.8
                                }px`
                            }}
                        ></div>
                    )}
                </div>
            </div>

            <p
                onClick={(e) => clickHandler(e, row.id)}
                className="main__row-element"
            >
                {row.title}
            </p>
            {row.type !== "level" && (
                <>
                    <p
                        onClick={(e) => clickHandler(e, row.id)}
                        className="main__row-element"
                    >
                        {row.unit}
                    </p>
                    <p
                        onClick={(e) => clickHandler(e, row.id)}
                        className="main__row-element"
                    >
                        {row.quantity}
                    </p>
                    <p
                        onClick={(e) => clickHandler(e, row.id)}
                        className="main__row-element"
                    >
                        {row.unitPrice}
                    </p>
                </>
            )}

            <p className="main__row-element price">{row.price}</p>
        </div>
    );
};

export default RowItemReadMode;
