export const columns = [
    {
        title: 'Symbols',
        dataIndex: 'pair',
        sorter: (a, b) => a.pair.length - b.pair.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Last price',
        dataIndex: 'last_price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.last_price - b.last_price,
    },
    {
        title: 'Daily Change',
        dataIndex: 'daily_change',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.daily_change - b.daily_change
    },
    {
        title: 'Daily Change Percent',
        dataIndex: 'daily_change_relative',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.daily_change_relative - b.daily_change_relative,
    },
    {
        title: 'Daily high',
        dataIndex: 'high',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.high - b.high,
    },
    {
        title: 'Daily low',
        dataIndex: 'low',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.low - b.low,
    },
    {
        title: 'Volume',
        dataIndex: 'volume',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.volume - b.volume,
    },
];