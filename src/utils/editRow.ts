import { recalculation } from "./recalculation";
import { RowData } from "../types/rows";

export function editRow(row: RowData, storage: RowData[]) {
    const index = storage.findIndex((v) => v.id === row.id);
    storage.splice(index, 1, row);

    return {
        current: row,
        changed: recalculation(row.parent, JSON.parse(JSON.stringify(storage)))
    };
}
