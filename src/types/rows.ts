export interface NewRowData {
    title: string; // Наименование работ
    unit: string; // Ед. изм.
    quantity: number; // Количество
    unitPrice: number; // Цена за ед.
    price: number; // Стоимость

    parent: number | null; // id уровня, в котором находится (либо null для первого уровня)
    type: "level" | "row";
}

export interface TreeDataItem {
    id: number;
    parentId: number | null;
    children?: TreeDataItem[];
}
export interface TreeData {
    list: TreeDataItem[];
}

export interface RowComponentProps {
    children: TreeDataItem[];
    iconWidth: number;
    hasChildren: boolean | undefined;
    margin: number;
    icon: JSX.Element;
    row: RowData;
    stateStorage: RowData[];
}

export interface ReadComponentProps extends RowComponentProps {
    onUpdate(row: RowData): void;
}

export interface RowData extends NewRowData {
    id: number;
}

export interface RowsState {
    rows: RowData[];
    currentEditingId: number | null;
    error: null | string;
}

export enum RowsActionTypes {
    FETCH_ROWS = "FETCH_ROWS",
    FETCH_ROWS_SUCCESS = "FETCH_ROWS_SUCCESS",
    FETCH_ROWS_ERROR = "FETCH_ROWS_ERROR"
}

export interface FetchRowsAction {
    type: RowsActionTypes.FETCH_ROWS;
}

export interface FetchRowsSuccessAction {
    type: RowsActionTypes.FETCH_ROWS_SUCCESS;
    payload: RowData[];
}

export interface FetchRowsErrorAction {
    type: RowsActionTypes.FETCH_ROWS_ERROR;
    payload: string;
}

export type RowsAction =
    | FetchRowsAction
    | FetchRowsSuccessAction
    | FetchRowsErrorAction;
