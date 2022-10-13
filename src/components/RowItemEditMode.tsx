import { useState, useEffect } from "react";
import { RowComponentProps, RowData } from "../types/rows";
import { useAppDispatch } from "../hooks/redux";
import { rowEdited, updateEditingId } from "../store/reducers/rowsReducer";
import { editRow } from "../utils/editRow";

const RowItemEditMode: React.FC<RowComponentProps> = (
    props: RowComponentProps
) => {
    const [title, setTitle] = useState<string>("");
    const [unit, setUnit] = useState<string>("");
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const dispatch = useAppDispatch();

    const { row, stateStorage, icon, margin } = props;

    useEffect(() => {
        if (row) {
            setTitle(row.title);
            setUnit(row.unit);
            setUnitPrice(row.unitPrice);
            setQuantity(row.quantity);
        }
    }, [row]);

    const updateTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const updateUnitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnit(e.target.value);
    };
    const updateUnitPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnitPrice(Number(e.target.value));
    };
    const updateQuantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const saveRowHandler = (
        e: React.KeyboardEvent<HTMLInputElement>,
        row: RowData
    ) => {
        if (e.key === "Enter") {
            const editedRow =
                row.type === "row"
                    ? {
                          ...row,
                          title: title,
                          unit: unit,
                          unitPrice: unitPrice,
                          quantity: quantity,
                          price: unitPrice * quantity
                      }
                    : { ...row, title: title };

            dispatch(rowEdited(editedRow));
            const { changed } = editRow(editedRow, stateStorage);
            if (changed.length > 0) {
                changed.map((changedRow) => dispatch(rowEdited(changedRow)));
            }
            setTitle("");
            setUnit("");
            setUnitPrice(0);
            setQuantity(0);
            dispatch(updateEditingId(null));
        }
    };

    return (
        <>
            {row.type === "level" ? (
                <div key={row.id} className="main__table-row">
                    <div>
                        {row.parent !== null && (
                            <div
                                className="dash"
                                style={{ left: `${4.5 + margin}px` }}
                            ></div>
                        )}
                        <div style={{ marginLeft: `${12 + margin}px` }}>
                            {icon}
                        </div>
                    </div>

                    <input
                        placeholder={row.title}
                        value={title}
                        onChange={(e) => updateTitleHandler(e)}
                        onKeyDown={(e) => saveRowHandler(e, row)}
                        className="table-input"
                    />
                    <p className="main__row-element price">{row.price}</p>
                </div>
            ) : (
                <div key={row.id} className="main__table-row">
                    <div>
                        <div
                            className="dash"
                            style={{ left: `${4.5 + margin}px` }}
                        ></div>
                        <div
                            className="main-icon"
                            style={{ marginLeft: `${12 + margin}px` }}
                        >
                            {icon}
                        </div>
                    </div>
                    <input
                        placeholder={row.title}
                        value={title}
                        onChange={(e) => updateTitleHandler(e)}
                        onKeyDown={(e) => saveRowHandler(e, row)}
                        className="table-input"
                    />
                    <input
                        placeholder={row.unit}
                        value={unit}
                        onChange={(e) => updateUnitHandler(e)}
                        onKeyDown={(e) => saveRowHandler(e, row)}
                        className="table-input"
                    />
                    <input
                        placeholder={row.unitPrice.toString()}
                        value={unitPrice}
                        onChange={(e) => updateUnitPriceHandler(e)}
                        onKeyDown={(e) => saveRowHandler(e, row)}
                        className="table-input"
                    />
                    <input
                        placeholder={row.quantity.toString()}
                        value={quantity}
                        onChange={(e) => updateQuantityHandler(e)}
                        onKeyDown={(e) => saveRowHandler(e, row)}
                        className="table-input"
                    />
                    <p className="main__row-element">
                        {row.unitPrice * row.quantity}
                    </p>
                </div>
            )}
        </>
    );
};

export default RowItemEditMode;
