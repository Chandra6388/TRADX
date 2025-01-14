
import { Eye } from "lucide-react";

export const getColumns = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "ScalpType",
        label: "ScalpType",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lot",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExpiryDate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "TaskTime",
        label: "Task Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },

]
export const getColumns1 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "STG",
        label: "Strategy Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Expirydate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "strategytype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    },
    {
        name: "SL value",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lot Size",
        label: "LotSize",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Product Type",
        label: "Product Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Entry Time",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exit Time",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StrikeType",
        label: "Strike Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DepthofStrike",
        label: "Strike value",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DeepStrike",
        label: "Deep Strike",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "LowerRange",
        label: "Lower Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HigherRange",
        label: "Higher Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthLower",
        label: "CEDepth Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthHigher",
        label: "CEDepth Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthLower",
        label: "PEDepth Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PEDepth Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepLower",
        label: "CEDeep Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepHigher",
        label: "CEDeep Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepHigher",
        label: "PEDeep Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepLower",
        label: "PEDeep Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },

]
export const getColumns2 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "TradePattern",
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pattern",
        label: "Pattern Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TStype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        label: "stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Expiry Date",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeCount",
        label: "TradeCount",
        options: {
            filter: true,
            sort: true,
        }
    },

];

export const getColumns9 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    {
        name: "ScalpType",
        label: "ScalpType",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lot",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExpiryDate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "TaskTime",
        label: "Task Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StepUp",
        label: "StepUp",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "IncrementType",
        label: "Increment Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Incrementvalue",
        label: "Increment Value",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Targetselection",
        label: "Target Selection",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point2",
        label: "Booking Point2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point3",
        label: "Booking Point3",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity2",
        label: "Quantity2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity3",
        label: "Quantity3",
        options: {
            filter: true,
            sort: true,
        }
    },

]


export const getColumns3 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "ScalpType",
        label: "ScalpType",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
]
export const getColumns6 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "ScalpType",
        label: "ScalpType",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExitPrice",
        label: "Exit Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
        label: "TradeType",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
]
// Option
export const getColumns4 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "STG",
        label: "Strategy",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "LotSize",
        label: "Lot Size",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Option Type",
        label: "Option Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Spot Price",
        label: "Spot Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Hashing",
        label: "Hashing",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
]
export const getColumns7 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "STG",
        label: "Strategy",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExitPrice",
        label: "Exit Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "LotSize",
        label: "LotSize",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Option Type",
        label: "Option Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Spot Price",
        label: "Spot Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Hashing",
        label: "Hashing",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
]
//Pattern
export const getColumns5 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "TradePattern",
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "SPattern",
        label: "Pattern Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PatternTime",
        label: "Pattern Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },

]

export const getColumns8 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                const rowIndex = tableMeta.rowIndex;

                return rowIndex + 1;

            }
        },
    },
    {
        name: "TradePattern",
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SPattern",
        label: "Pattern Name",
        options: {
            filter: true,
            sort: true,
        }
    }, 
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PatternTime",
        label: "Pattern Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitPrice",
        label: "Exit Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
     
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },
   
     
    {
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },

]


export const getColumns10 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },
    
    
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TSymbol",
        label: "TSymbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lotsize",
        label: "Lotsize",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Planname",
        label: "Plan Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Sl",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exittime",
        label: "Exittime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Ordertype",
        label: "Ordertype",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "AccType",
        label: "Account Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Price",
        label: "Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Optiontype",
        label: "Optiontype",
        options: {
            filter: true,
            sort: true,
        }
    },

];

export const getColumns11 = () => [
    {
        name: "S.No",
        label: "S.No",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const rowIndex = tableMeta.rowIndex;
                return rowIndex + 1;
            }
        },
    },


    {
        name: "Segment",
        label: "Segment",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "View",
        label: "View",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <button
                        onClick={() => {
                            const rowIndex = tableMeta.rowIndex;
                            console.log("View clicked for row:", rowIndex);

                            // Scroll to the bottom of the page (or to a specific element)
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: "smooth", // Smooth scroll
                            });

                            // Alternatively, you can scroll by a specific amount
                            // window.scrollBy(0, 500); // Scroll 500px down
                        }}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <Eye color="#007BFF" size={20} />
                    </button>
                );
            },
        },
    },

    {
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Fund",
        label: "Fund",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeCount",
        label: "TradeCount",
        options: {
            filter: true,
            sort: true,
        }
    },

];

