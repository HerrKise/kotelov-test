import { RowData } from "./../../types/rows";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RowsState } from "../../types/rows";

const initialState: RowsState = {
    rows: [
        {
            id: 1,
            title: "Наименование работ",
            unit: "",
            unitPrice: 0,
            price: 0,
            parent: null,
            quantity: 0,
            type: "level"
        }
    ],
    currentEditingId: 1,
    error: null
};

export const rowsSlice = createSlice({
    name: "rows",
    initialState,
    reducers: {
        addRow: (state, action: PayloadAction<RowData>) => {
            state.rows.push(action.payload);
        },
        rowEdited: (state, action: PayloadAction<RowData>) => {
            state.rows[
                state.rows.findIndex((row) => row.id === action.payload.id)
            ] = action.payload;
        },
        updateEditingId: (state, action: PayloadAction<number | null>) => {
            state.currentEditingId = action.payload;
        }
    }
});

export const { reducer: rowsReducer, actions } = rowsSlice;
export const { addRow, updateEditingId, rowEdited } = actions;
