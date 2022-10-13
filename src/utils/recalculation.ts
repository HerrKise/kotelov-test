import { RowData } from "../types/rows";

export function recalculation(parentID: number | null, storage: RowData[]) {
    const rows = [...storage];
    const changedRows: RowData[] = [];

    if (parentID == null) return changedRows;
    let currentParentIndex = rows.findIndex((v) => v.id === parentID);
    if (currentParentIndex === -1) return changedRows;

    do {
        const currentParent = rows[currentParentIndex];
        const children = rows.filter((v) => v.parent == currentParent.id);
        const newPrice = children.reduce((acc, v) => acc + v.price, 0);

        if (currentParent.price !== newPrice) {
            rows[currentParentIndex].price = newPrice;
            changedRows.push(rows[currentParentIndex]);

            currentParentIndex = rows.findIndex(
                (v) => v.id === currentParent.parent
            );
            continue;
        }

        break;
    } while (currentParentIndex !== -1);

    return changedRows;
}
