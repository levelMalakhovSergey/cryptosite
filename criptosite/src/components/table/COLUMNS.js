import {ColumnFilter} from "./ColumnFilter";
export const COLUMNS = [
    {
        Header: 'Symbol',
        Footer: 'Symbol',
        accessor: 'symbol',
        Filter: ColumnFilter,
        disableFilters: true,
    },
    {
        Header: 'Last Price',
        Footer: 'Last Price',
        accessor: 'last_price',
        Filter: ColumnFilter
    },
    {
        Header: 'Daily Change',
        Footer: 'Daily Change,',
        accessor: 'daily_change',
        Filter: ColumnFilter
    },
    {
        Header: 'Daily Change Percent',
        Footer: 'Daily Change Percent,',
        accessor: 'daily_change_percent',
        Filter: ColumnFilter
    },
    {
        Header: 'Daily high',
        Footer: 'Daily high',
        accessor: 'daily_high',
        Filter: ColumnFilter
    },
    {
        Header: 'Daily low',
        Footer: 'Daily low',
        accessor: 'daily_low',
        Filter: ColumnFilter
    },
]
