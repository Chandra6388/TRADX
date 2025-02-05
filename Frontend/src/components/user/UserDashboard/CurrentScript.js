import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { GetAllUserScript, DeleteUserScript, Discontinue, Continue, UpdateUserScript, GetUserScripts, getUserChartingScripts, DeleteSingleChartingScript } from '../../CommonAPI/User';
import Loader from '../../../ExtraComponent/Loader';
import { getColumns3, getColumns4, getColumns5, getColumns6, getColumns8 } from './Columns';
import Swal from 'sweetalert2';
import Formikform from "../../../ExtraComponent/FormData";
import { useFormik } from 'formik';


const Coptyscript = ({ tableType, data, selectedType, data2 }) => {
    const userName = localStorage.getItem('name')
    const adminPermission = localStorage.getItem('adminPermission')
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [EditDataScalping, setEditDataScalping] = useState({})
    const [EditDataOption, setEditDataOption] = useState({})
    const [EditDataPattern, setEditDataPattern] = useState({})
    const [allScripts, setAllScripts] = useState({ data: [], len: 0 })
    const [editCharting, setEditCharting] = useState();
    const [getCharting, setGetCharting] = useState([]);

    const [getAllService, setAllservice] = useState({
        loading: true,
        ScalpingData: [],
        OptionData: [],
        PatternData: [],
        PatternOption: [],
        Marketwise: [],
        PremiumRotation: []
    });
    useEffect(() => {
        GetUserAllScripts()

    }, [])


    useEffect(() => {
        if (data == "ChartingPlatform")
            getChartingScript();
    }, [data]);



    const getChartingScript = async () => {
        const req = { Username: userName, Planname: "Chart" }
        await getUserChartingScripts(req)
            .then((response) => {
                if (response.Status) {
                    setGetCharting(response.Client)
                }
                else {
                    setGetCharting([])
                }
            })
            .catch((err) => {
                console.log("Error in finding the User Scripts", err)
            })
    }

    const GetUserAllScripts = async () => {
        const data = { Username: userName }
        await GetUserScripts(data)
            .then((response) => {
                if (response.Status) {
                    setAllScripts({
                        data: response.data,
                        len: response.data?.length - 1
                    })
                }
                else {
                    setAllScripts({
                        data: [],
                        len: 0
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the User Scripts", err)
            })
    }

    const SweentAlertFun = (text) => {
        Swal.fire({
            title: "Error",
            text: text,
            icon: "error",
            timer: 10000,
            timerProgressBar: true
        });
    }

    const handleDelete = async (rowData, type) => {
        const index = rowData.rowIndex
        const req =
            data == 'Scalping' && type == 1 ?
                {
                    Username: userName,
                    MainStrategy: data,
                    Strategy: getAllService.ScalpingData[index].ScalpType,
                    Symbol: getAllService.ScalpingData[index].Symbol,
                    ETPattern: "",
                    Timeframe: "",
                    TType: "",
                    Group: getAllService.ScalpingData[index].GroupN,
                    TradePattern: "",
                    TSymbol: "",
                    PatternName: ""
                } : data == 'Option Strategy' ?
                    {
                        MainStrategy: data,
                        Strategy: getAllService.OptionData[index].STG,
                        Symbol: getAllService.OptionData[index].MainSymbol,
                        Username: userName,
                        ETPattern: getAllService.OptionData[index].Targettype,
                        Timeframe: "",
                        TType: "",
                        Group: getAllService.OptionData[index].GroupN,
                        TSymbol: "",
                        TradePattern: "",
                        PatternName: ""
                    }
                    : data == 'Pattern' ?
                        {

                            MainStrategy: data,
                            Strategy: getAllService.PatternData[index].TradePattern,
                            Symbol: getAllService.PatternData[index].Symbol,
                            Username: userName,
                            ETPattern: getAllService.PatternData[index].Pattern,
                            Timeframe: getAllService.PatternData[index].TimeFrame,
                            TType: getAllService.PatternData[index].TType,
                            Group: "",
                            TSymbol: "",
                            TradePattern: "",
                            PatternName: ""

                        } : data == 'Scalping' && type == 2 ?
                            {
                                Username: userName,
                                MainStrategy: "NewScalping",
                                Strategy: getAllService.NewScalping[index].Targetselection,
                                Symbol: getAllService.NewScalping[index].Symbol,
                                ETPattern: "",
                                Timeframe: "",
                                TType: "",
                                Group: getAllService.NewScalping[index].GroupN,
                                TradePattern: "",
                                TSymbol: "",
                                PatternName: ""
                            } : ''


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await DeleteUserScript(req)
                    .then((response) => {
                        if (response.Status) {
                            Swal.fire({
                                title: "Square off Successfully!",
                                text: response.message,
                                icon: "success",
                                timer: 1500,
                                timerProgressBar: true,
                                didClose: () => {
                                    setRefresh(!refresh);
                                }
                            });
                            setTimeout(() => {
                                window.location.reload()
                            }, 1500)
                        } else {
                            Swal.fire({
                                title: "Error !",
                                text: response.message,
                                icon: "error",
                                timer: 1500,
                                timerProgressBar: true
                            });
                        }

                    })
                    .catch((err) => {
                        console.log("Error in delete script", err)
                    })
            }
        });

    }

    const handleEdit = async (rowData, type) => {
        setShowEditModal(true)
        const index = rowData.rowIndex
        if (data == 'Scalping' && type == 1) {
            setEditDataScalping(getAllService.ScalpingData[index])
        }
        else if (data == 'Scalping' && type == 2) {
            setEditDataScalping(getAllService.NewScalping[index])

        }
        else if (data == 'Option Strategy') {
            setEditDataOption(getAllService.OptionData[index])
        }
        else if (data == 'Pattern') {
            setEditDataPattern(getAllService.PatternData[index])
        }
        else {
            setEditDataPattern(getAllService.PatternData[index])
        }
    }

    const HandleContinueDiscontinue = async (rowData, type) => {

        const index = rowData.rowIndex
        let trading;


        if (data == 'Scalping' && type == 1) {
            trading = getAllService.ScalpingData[index].Trading
        }
        else if (data == 'Scalping' && type == 2) {
            trading = getAllService.NewScalping[index].Trading
        }
        else if (data == 'Pattern') {
            trading = getAllService.PatternData[index].Trading
        }
        else if (data == 'Option Strategy') {
            trading = getAllService.OptionData[index].Trading
        }
        else if (data == 'ChartingPlatform') {
            trading = getCharting[index].Trading
        }
        else {
            console.log("Error in finding the trading status")
            return
        }

        // console.log("getCharting[index]?.AccType", getCharting[index]?.AccType)
        if (trading) {
            Swal.fire({
                title: "Do you want to Discontinue",
                text: "You won't be able to revert this!",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const req =
                        data == 'Scalping' && type == 1 ?
                            {
                                Username: userName,
                                MainStrategy: data,
                                Strategy: getAllService.ScalpingData[index].ScalpType == "Multi_Conditional" ? getAllService.NewScalping[index].Targetselection : getAllService.ScalpingData[index].ScalpType,
                                Symbol: getAllService.ScalpingData[index].Symbol,
                                ETPattern: "",
                                Timeframe: "",
                                TType: "",
                                Group: getAllService.ScalpingData[index].GroupN,
                                TradePattern: "",
                                TSymbol: "",
                                PatternName: ""
                            } : data == 'Option Strategy' ?
                                {
                                    MainStrategy: data,
                                    Strategy: getAllService.OptionData[index].STG,
                                    Symbol: getAllService.OptionData[index].MainSymbol,
                                    Username: userName,
                                    ETPattern: getAllService.OptionData[index].Targettype,
                                    Timeframe: "",
                                    TType: "",
                                    Group: getAllService.OptionData[index].GroupN,
                                    TSymbol: "",
                                    TradePattern: "",
                                    PatternName: ""
                                }
                                : data == 'Pattern' ?
                                    {

                                        MainStrategy: data,
                                        Strategy: getAllService.PatternData[index].TradePattern,
                                        Symbol: getAllService.PatternData[index].Symbol,
                                        Username: userName,
                                        ETPattern: getAllService.PatternData[index].Pattern,
                                        Timeframe: getAllService.PatternData[index].TimeFrame,
                                        TType: getAllService.PatternData[index].TType,
                                        Group: "",
                                        TSymbol: "",
                                        TradePattern: "",
                                        PatternName: ""

                                    } : data == 'Scalping' && type == 2 ?
                                        {
                                            Username: userName,
                                            MainStrategy: "NewScalping",
                                            Strategy: getAllService.NewScalping[index].Targetselection,
                                            Symbol: getAllService.NewScalping[index].Symbol,
                                            ETPattern: "",
                                            Timeframe: "",
                                            TType: "",
                                            Group: getAllService.NewScalping[index].GroupN,
                                            TradePattern: "",
                                            TSymbol: "",
                                            PatternName: ""
                                        } : data == 'ChartingPlatform' ?
                                            {
                                                Username: userName,
                                                User: getCharting[index]?.AccType,
                                                Symbol: getCharting[index]?.TSymbol,
                                            } : ''


                    if (data == 'ChartingPlatform') {
                        await DeleteSingleChartingScript(req)
                            .then((response) => {
                                if (response.Status) {
                                    Swal.fire({
                                        title: "Success",
                                        text: response.message,
                                        icon: "success",
                                        timer: 2000,
                                        timerProgressBar: true
                                    }).then(() => {
                                        setRefresh(!refresh)
                                    });
                                }
                                else {
                                    Swal.fire({
                                        title: "Error !",
                                        text: response.message,
                                        icon: "error",
                                        timer: 2000,
                                        timerProgressBar: true
                                    });
                                }
                            })
                    }
                    else {
                        await Discontinue(req)
                            .then((response) => {
                                console.log("response", response)
                                if (response.Status) {
                                    Swal.fire({
                                        title: "Success",
                                        text: response.message,
                                        icon: "success",
                                        timer: 2000,
                                        timerProgressBar: true
                                    }).then(() => {
                                        setRefresh(!refresh)
                                    });

                                }
                                else {
                                    Swal.fire({
                                        title: "Error !",
                                        text: response.message,
                                        icon: "error",
                                        timer: 2000,
                                        timerProgressBar: true
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log("Error in delete script", err)
                            })

                    }





                }
            })
        }

        else if (data == 'ChartingPlatform') {
            return;
        }
        else {
            {
                Swal.fire({
                    title: "Do you want to Continue",
                    text: "You won't be able to revert this!",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const req =
                            data == 'Scalping' && type == 1 ?
                                {
                                    Username: userName,
                                    MainStrategy: data,
                                    Strategy: getAllService.ScalpingData[index].ScalpType,
                                    Symbol: getAllService.ScalpingData[index].Symbol,
                                    ETPattern: "",
                                    Timeframe: "",
                                    TType: "",
                                    Group: getAllService.ScalpingData[index].GroupN,
                                    TradePattern: "",
                                    TSymbol: "",
                                    PatternName: ""
                                } : data == 'Option Strategy' ?
                                    {
                                        MainStrategy: data,
                                        Strategy: getAllService.OptionData[index].STG,
                                        Symbol: getAllService.OptionData[index].MainSymbol,
                                        Username: userName,
                                        ETPattern: getAllService.OptionData[index].Targettype,
                                        Timeframe: "",
                                        TType: "",
                                        Group: getAllService.OptionData[index].GroupN,
                                        TSymbol: "",
                                        TradePattern: "",
                                        PatternName: ""
                                    }
                                    : data == 'Pattern' ?
                                        {

                                            MainStrategy: data,
                                            Strategy: getAllService.PatternData[index].TradePattern,
                                            Symbol: getAllService.PatternData[index].Symbol,
                                            Username: userName,
                                            ETPattern: getAllService.PatternData[index].Pattern,
                                            Timeframe: getAllService.PatternData[index].TimeFrame,
                                            TType: getAllService.PatternData[index].TType,
                                            Group: "",
                                            TSymbol: "",
                                            TradePattern: "",
                                            PatternName: ""

                                        } : data == 'Scalping' && type == 2 ?

                                            {
                                                Username: userName,
                                                MainStrategy: "NewScalping",
                                                Strategy: getAllService.NewScalping[index].Targetselection,
                                                Symbol: getAllService.NewScalping[index].Symbol,
                                                ETPattern: "",
                                                Timeframe: "",
                                                TType: "",
                                                Group: getAllService.NewScalping[index].GroupN,
                                                TradePattern: "",
                                                TSymbol: "",
                                                PatternName: ""
                                            } : ''



                        await Continue(req)
                            .then((response) => {
                                if (response.Status) {
                                    Swal.fire({
                                        title: "Success",
                                        text: response.message,
                                        icon: "success",
                                        timer: 1500,
                                        timerProgressBar: true
                                    }).then(() => {
                                        setRefresh(!refresh)
                                    });
                                }
                                else {
                                    Swal.fire({
                                        title: "Error !",
                                        text: response.message,
                                        icon: 'error',
                                        timer: 1500,
                                        timerProgressBar: true
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log("Error in delete script", err)
                            })
                    }
                })
            }

        }


    }

    const AddScript = (data) => {
        if (data2.status == false) {
            Swal.fire({
                title: "Error",
                text: data2.msg,
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            });
        }
        else {
            if (data === "Option Strategy") {
                if (allScripts?.data?.[allScripts.len]?.CombineOption?.length >= 1) {
                    navigate('/user/newscript/option', { state: { data: { selectStrategyType: 'Option Strategy', scriptType: allScripts } } });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "Don't have any script left Please buy some Scripts",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });

                }
            }
            else if (data === "Pattern" || data === "Pattern Script") {
                if (allScripts?.data?.[allScripts.len]?.CombinePattern?.length >= 1) {
                    navigate('/user/newscript/pattern', { state: { data: { selectStrategyType: 'Pattern', scriptType: allScripts } } });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "Don't have any script left Please buy some Scripts",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });
                }

            }
            else if (data === "ChartingPlatform") {
                if (allScripts?.data?.[allScripts.len]?.CombineChartingSignal?.length >= 1) {
                    navigate('/user/newscript/charting', { state: { data: { selectStrategyType: 'ChartingPlatform', scriptType: allScripts } } });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "Don't have any script left Please buy some Scripts",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });
                }
            }

            else {
                if (allScripts?.data?.[allScripts.len]?.CombineScalping?.length >= 1) {
                    navigate('/user/newscript/scalping', {
                        state: {
                            data: { selectStrategyType: 'Scalping', scriptType: allScripts }
                        },
                    });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "Don't have any script left Please buy some Scripts",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });
                }

            }
        }

    }

    const GetAllUserScriptDetails = async () => {
        const data = { userName: userName };

        await GetAllUserScript(data)
            .then((response) => {
                if (response.Status) {
                    setAllservice({
                        loading: false,
                        ScalpingData: response.Scalping,
                        OptionData: response.Option,
                        PatternData: response.Pattern,
                        PatternOption: response.PatternOption,
                        Marketwise: response.Marketwise,
                        PremiumRotation: response.PremiumRotation,
                        NewScalping: response.NewScalping
                    });
                } else {
                    setAllservice({
                        loading: false,
                        ScalpingData: [],
                        OptionData: [],
                        PatternData: [],
                        PatternOption: [],
                        Marketwise: [],
                        PremiumRotation: []
                    });
                }
            })
            .catch((err) => {
                console.log("Error in finding group service", err);
            });
    }

    useEffect(() => {
        GetAllUserScriptDetails();
    }, [selectedType, refresh, showEditModal]);

    const formik = useFormik({
        initialValues: {
            TStype: "",
            Quantity: 0,
            Targetvalue: 0.0,
            Slvalue: 0,
            EntryPrice: 0,
            EntryRange: 0,
            LowerRange: 0.0,
            HigherRange: 0.0,
            HoldExit: "Hold",
            EntryTime: "",
            ExitTime: "",
            TradeCount: 0
        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (values.TStype == "" && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.TStype = "Please select Measurement Type";
            }
            if (!values.Quantity || values.Quantity == 0) {
                errors.Quantity = "Please enter Quantity";
            }
            if (values.Targetvalue == 0.0 || !values.Targetvalue) {
                errors.Targetvalue = "Please enter Target value";
            }
            if (values.Slvalue == 0 || !values.Slvalue) {
                errors.Slvalue = "Please enter SL value";
            }
            if (!values.EntryPrice && values.EntryPrice != 0 && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.EntryPrice = "Please enter Entry Price";
            }
            if (!values.EntryRange && values.EntryRange != 0 && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.EntryRange = "Please enter Entry Range";
            }
            if (!values.LowerRange && values.LowerRange != 0) {
                errors.LowerRange = "Please enter Lower Range";
            }
            if (!values.HigherRange && values.HigherRange != 0) {
                errors.HigherRange = "Please enter Higher Range";
            }
            if (values.HoldExit == "" && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.HoldExit = "Please select Hold/Exit";
            }

            if (values.ExitTime == '') {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (values.EntryTime == '') {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Strategy: EditDataScalping.ScalpType,
                Symbol: EditDataScalping.Symbol,
                Username: userName,
                MainStrategy: data,
                ETPattern: "",
                Timeframe: "",
                Targetvalue: Number(values.Targetvalue),
                Slvalue: Number(values.Slvalue),
                TStype: EditDataScalping.ScalpType != "Fixed Price" ? values.TStype : EditDataScalping.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: Number(values.LowerRange),
                HigherRange: Number(values.HigherRange),
                HoldExit: showEditModal && EditDataScalping.ScalpType != "Fixed Price" ? EditDataScalping.HoldExit : values.HoldExit,
                EntryPrice: Number(values.EntryPrice),
                EntryRange: Number(values.EntryRange),
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataScalping.ExitDay,
                TradeExecution: EditDataScalping.TradeExecution,
                Group: EditDataScalping.GroupN,
                CEDepthLower: 0.0,
                CEDepthHigher: 0.0,
                PEDepthLower: 0.0,
                PEDepthHigher: 0.0,
                CEDeepLower: 0.0,
                CEDeepHigher: 0.0,
                PEDeepLower: 0.0,
                PEDeepHigher: 0.0,
                DepthofStrike: 0,
                TradeCount: values.TradeCount

            }
            if (Number(values.EntryPrice) > 0 && Number(values.EntryRange) && (Number(values.EntryPrice) >= Number(values.EntryRange))) {
                return SweentAlertFun(showEditModal && EditDataScalping.ScalpType == "Fixed Price" ? "Higher Price should be greater than Lower Price" : "First Trade Higher Range should be greater than First Trade Lower Range")
            }

            if (Number(values.LowerRange) > 0 && Number(values.HigherRange) > 0 && (Number(values.LowerRange) >= Number(values.HigherRange))) {
                return SweentAlertFun("Higher Range should be greater than Lower Range")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Targetvalue) <= Number(values.Slvalue))) {
                return SweentAlertFun("Target Price should be greater than Stoploss Price")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Targetvalue) <= Number(values.EntryRange))) {
                return SweentAlertFun("Target Price should be greater than Higher price")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Slvalue) >= Number(values.EntryPrice))) {
                return SweentAlertFun("Lower Price should be greater than Stoploss Price")
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }

            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    const formik1 = useFormik({
        initialValues: {
            MainStrategy: "",
            Strategy: "",
            Symbol: "",
            Username: "",
            ETPattern: "",
            Timeframe: "",
            Targetvalue: 0,
            Slvalue: 0,
            TStype: "",
            Quantity: "",
            LowerRange: 0,
            HigherRange: 0,
            HoldExit: "",
            EntryPrice: 0,
            EntryRange: 0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            TradeExecution: "",
            Group: "",
            CEDepthLower: 0.0,
            CEDepthHigher: 0.0,
            PEDepthLower: 0.0,
            PEDepthHigher: 0.0,
            CEDeepLower: 0.0,
            CEDeepHigher: 0.0,
            PEDeepLower: 0.0,
            PEDeepHigher: 0.0,
            DepthofStrike: 0,
            TradeCount: 0,
        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.TStype) {
                errors.TStype = "Please Select Measurement Type."
            }
            if (!values.Quantity) {
                errors.Quantity = "Please Enter Lot Size."
            }
            if (!values.Targetvalue) {
                errors.Targetvalue = "Please Enter Target Value."
            }
            if (!values.Slvalue) {
                errors.Slvalue = "Please Enter Stoploss."
            }

            if (values.ExitTime == '') {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (values.EntryTime == '') {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }


            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                MainStrategy: data,
                Strategy: EditDataOption.STG,
                Symbol: EditDataOption.MainSymbol,
                Username: userName,
                ETPattern: EditDataOption.Targettype,
                Timeframe: "",
                Targetvalue: values.Targetvalue,
                Slvalue: Number(values.Slvalue),
                TStype: values.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: EditDataOption.LowerRange,
                HigherRange: EditDataOption.HigherRange,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataOption['Product Type'],
                TradeExecution: EditDataOption.TradeExecution,
                Group: EditDataOption.GroupN,
                CEDepthLower: EditDataOption.CEDepthLower,
                CEDepthHigher: EditDataOption.CEDepthHigher,
                PEDepthLower: EditDataOption.PEDepthLower,
                PEDepthHigher: EditDataOption.PEDepthHigher,
                CEDeepLower: EditDataOption.CEDeepLower,
                CEDeepHigher: EditDataOption.PEDeepHigher,
                PEDeepLower: EditDataOption.PEDeepLower,
                PEDeepHigher: EditDataOption.PEDeepHigher,
                DepthofStrike: EditDataOption.DepthofStrike,
                TradeCount: values.TradeCount
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }
            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    const MultiConditionFormik = useFormik({


        initialValues: {
            MainStrategy: "",
            Strategy: "",
            Symbol: "",
            Username: "",
            ETPattern: "",
            Timeframe: "",
            Targetvalue: 0,
            Slvalue: 0,
            TStype: "",
            Quantity: 0,
            LowerRange: 0,
            HigherRange: 0,
            HoldExit: "",
            EntryPrice: 0,
            EntryRange: 0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            TradeExecution: "",
            Group: "",
            CEDepthLower: 0,
            CEDepthHigher: 0,
            PEDepthLower: 0,
            PEDepthHigher: 0,
            CEDeepLower: 0,
            CEDeepHigher: 0,
            PEDeepLower: 0,
            PEDeepHigher: 0,
            DepthofStrike: 0,
            TradeCount: 0,
            stepup: 0,
            quantityvalue: 0,
            tgp2: 0.0,
            tgp3: 0.0,
            quantity2: 0,
            quantity3: 0,
            RolloverTF: false,
            RolloverDay: "",
            RolloverTime: "",
            TargetExit: false,
            RepeatationCount: 0,
            Profit: 0.0,
            Loss: 0.0,

        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.TStype && EditDataScalping?.PositionType == "Single") {
                errors.TStype = "Please Select Measurement Type."
            }
            if (!values.EntryRange && EditDataScalping?.PositionType == "Single") {
                errors.EntryRange = "Please Select Measurement Type."
            }

            if (!values.LowerRange && EditDataScalping?.PositionType == "Multiple") {
                errors.LowerRange = "Please Enter Lower Range."
            }

            if (!values.HigherRange && EditDataScalping?.PositionType == "Multiple") {
                errors.HigherRange = "Please Enter Higher Range."
            }
            if (!values.Quantity && EditDataScalping?.PositionType == "Single") {
                errors.Quantity = "Please Enter Lot Size."
            }
            if (!values.HoldExit && EditDataScalping?.PositionType == "Multiple") {
                errors.HoldExit = "Please Enter HoldExit."
            }

            if (!values.Targetvalue && EditDataScalping?.PositionType == "Single") {
                errors.Targetvalue = "Please Enter Target Value."
            }
            if (!values.Slvalue && EditDataScalping?.PositionType == "Single") {
                errors.Slvalue = "Please Enter Stoploss."
            }

            if (values.ExitTime == '') {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (values.EntryTime == '') {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }

            if (!values.TradeCount && EditDataScalping?.PositionType == "Single") {
                errors.TradeCount = "Please Enter Trade Count."
            }

            console.log("errors are ", errors)

            return errors;
        },
        onSubmit: async (values) => {

            const req = {
                MainStrategy: "NewScalping",
                Strategy: EditDataScalping.Targetselection,
                Symbol: EditDataScalping.Symbol,
                Username: userName,
                ETPattern: "", // Adjust if applicable
                Timeframe: "",
                Targetvalue: Number(values.Targetvalue),
                Slvalue: Number(values.Slvalue),
                TStype: values.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: Number(values.LowerRange),
                HigherRange: Number(values.HigherRange),
                HoldExit: values.HoldExit,
                EntryPrice: Number(values.EntryPrice),
                EntryRange: Number(values.EntryRange),
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataScalping.ExitDay,
                TradeExecution: EditDataScalping.TradeExecution,
                Group: EditDataScalping.GroupN,
                stepup: Number(EditDataScalping.StepUp),
                quantity2: Number(values.quantity2),
                quantity3: Number(values.quantity3),
                tgp2: Number(values.tgp2),
                tgp3: Number(values.tgp3),
                RolloverTF: false,
                RolloverDay: "",
                RolloverTime: "",
                TargetExit: false,
                RepeatationCount: 0,
                Profit: 0,
                Loss: 0,
                TradeCount: Number(values.TradeCount),
                CEDepthLower: 0,
                CEDepthHigher: 0,
                PEDepthLower: 0,
                PEDepthHigher: 0,
                CEDeepLower: 0,
                CEDeepHigher: 0,
                PEDeepLower: 0,
                PEDeepHigher: 0,
                DepthofStrike: 0,
                quantityvalue: 0,


            };
            if (
                (Number(values.EntryPrice) > 0 || Number(values.EntryRange) > 0) &&
                Number(values.EntryPrice) >= Number(values.EntryRange)
            ) {
                return SweentAlertFun(
                    values.Strategy === "Fixed Price"
                        ? "Higher Price should be greater than Lower Price"
                        : "First Trade Higher Range should be greater than First Trade Lower Range"
                );
            }

            if (
                values.Strategy !== "Fixed Price" &&
                Number(values.LowerRange) >= Number(values.HigherRange) &&
                (Number(values.LowerRange) > 0 || Number(values.HigherRange) > 0)
            ) {
                return SweentAlertFun(
                    "Higher Price should be greater than Lower Range"
                );
            }

            if (
                values.Strategy === "Fixed Price" &&
                values.TType === "SELL" &&
                (Number(values.Targetvalue) >= Number(values.EntryPrice) ||
                    Number(values.Slvalue) <= Number(values.EntryRange))
            ) {
                const alertMessage =
                    Number(values.Targetvalue) >= Number(values.EntryPrice)
                        ? "Target should be smaller than Lower Price"
                        : "Stoploss should be greater than Higher Price";

                return SweentAlertFun(alertMessage);
            }

            if (
                values.Strategy == "Multi_Conditional" &&
                values.position_type == "Single"
            ) {
                if (Number(values.quantity2) == 0 && Number(values.quantity3) > 0) {
                    return SweentAlertFun(
                        formik.values.Exchange == "NFO"
                            ? "Please Enter Lot 2"
                            : "Please Enter Quantity 2"
                    );
                }
                if (Number(values.tgp2) == 0 && Number(values.tgp3) > 0) {
                    return SweentAlertFun("Please Enter Target 2");
                }
            }

            

            console.log("req", req)


            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    console.log("MultiConditionFormik", MultiConditionFormik.values)

    const formik2 = useFormik({
        initialValues: {
            MainStrategy: "",
            Strategy: "",
            Symbol: "",
            Username: "",
            ETPattern: "",
            Timeframe: "",
            Targetvalue: 0,
            Slvalue: 0,
            TStype: "",
            Quantity: 0,
            LowerRange: 0.0,
            HigherRange: 0.0,
            HoldExit: "",
            EntryPrice: 0.0,
            EntryRange: 0.0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            TradeExecution: "",
            Group: "",
            CEDepthLower: 0.0,
            CEDepthHigher: 0.0,
            PEDepthLower: 0.0,
            PEDepthHigher: 0.0,
            CEDeepLower: 0.0,
            CEDeepHigher: 0.0,
            PEDeepLower: 0.0,
            PEDeepHigher: 0.0,
            DepthofStrike: 0,
            TradeCount: "",
        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.TStype) {
                errors.TStype = "Please Select Measurement Type."
            }
            if (!values.Quantity) {
                errors.Quantity = "Please Enter Lot Size."
            }
            if (!values.Targetvalue) {
                errors.Targetvalue = "Please Enter Target Value."
            }
            if (!values.Slvalue) {
                errors.Slvalue = "Please Enter Stoploss."
            }

            if (values.ExitTime == '') {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (values.EntryTime == '') {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                MainStrategy: data,
                Strategy: EditDataPattern.TradePattern,
                Symbol: EditDataPattern.Symbol,
                Username: userName,
                ETPattern: EditDataPattern.Pattern,
                Timeframe: EditDataPattern.TimeFrame,
                Targetvalue: Number(values.Targetvalue),
                Slvalue: Number(values.Slvalue),
                TStype: EditDataPattern.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: 0.0,
                HigherRange: 0.0,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataPattern.ExitDay,
                TradeExecution: EditDataPattern.TradeExecution,
                Group: "",
                CEDepthLower: 0.0,
                CEDepthHigher: 0.0,
                PEDepthLower: 0.0,
                PEDepthHigher: 0.0,
                CEDeepLower: 0.0,
                CEDeepHigher: 0.0,
                PEDeepLower: 0.0,
                PEDeepHigher: 0.0,
                DepthofStrike: 1,
                TradeCount: Number(values.TradeCount)
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }
            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    const fields = [
        {
            name: "Targetvalue",
            label: showEditModal && EditDataScalping.ScalpType == "Fixed Price" ? "Target Price" : formik.values.Strategy == "One Directional" ? "Fixed Target" : "Booking Point",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "Slvalue",
            label: showEditModal && EditDataScalping.ScalpType == "Fixed Price" ? "Stoploss Price" : "Re-Entry Point",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "EntryPrice",
            label: showEditModal && EditDataScalping.ScalpType != "Fixed Price" ? "First Trade Lower Range" : "Lower Price",
            type: "text3",

            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "EntryRange",
            label: showEditModal && EditDataScalping.ScalpType != "Fixed Price" ? "First Trade Higher Range" : "Higher Price",
            type: "text3",

            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "LowerRange",
            label: "Lower Range",
            type: "text3",
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "HigherRange",
            label: "Higher Range",
            type: "text5",
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "Quantity",
            label: showEditModal && EditDataScalping.Exchange == "NFO" ? "Lot" : "Quantity",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "HoldExit",
            label: "Hold/Exit",
            type: "select",
            options: [
                { label: "Hold", value: "Hold" },
                { label: "Exit", value: "Exit" },
            ],
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",

            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percentage", value: "Percentage" },
                { label: "Point", value: "Point" },
            ],
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },

        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },

    ];


    const EntryRuleArr = [

        {
            name: "EntryPrice",
            label: showEditModal && EditDataScalping?.PositionType == "Single" ? "Lower Price" : "First Trade Lower Range",
            type: "text3",
            col_size: 4,
            disable: false,
            headingtype: 2,
            hiding: false,
        },

        {
            name: "EntryRange",
            label: showEditModal && EditDataScalping?.PositionType == "Single" ? "Higher Price" : "First Trade Higher Range",
            type: "text3",
            label_size: 12,
            headingtype: 2,
            col_size: 4,
            disable: false,
            hiding: false,
        },


    ];

    const ExitRuleArr = [

        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percentage", value: "Percentage" },
                { label: "Point", value: "Point" },
            ],

            label_size: 12,
            headingtype: 4,
            col_size: formik.values.position_type == "Multiple" ? 3 : 4,
            hiding: false,
            disable: false,
        },

        {
            name: "Targetvalue",
            label: EditDataScalping?.PositionType == "Single" ? "Target Price 1" : "Fixed Target",

            type: "text3",
            label_size: 12,
            col_size: formik.values.position_type == "Multiple" ? 3 : 4,
            headingtype: 3,
            disable: false,
            hiding: false,
        },

        {
            name: "tgp2",
            label: "Target Price 2",
            type: "text3",
            label_size: 12,
            col_size: 4,
            showWhen: (values) => EditDataScalping?.PositionType == "Single",
            headingtype: 3,
            disable: false,
            hiding: false,
        },

        {
            name: "tgp3",
            label: "Target Price 3",
            type: "text3",
            label_size: 12,
            col_size: 4,
            showWhen: (values) => EditDataScalping?.PositionType == "Single",
            headingtype: 3,
            disable: false,
            hiding: false,
        },

        {
            name: "Slvalue",
            label: EditDataScalping?.PositionType == "Single" ? "Stoploss Price" : "Re-Entry Point",

            type: "text3",
            label_size: 12,
            col_size: 4,
            headingtype: 3,
            disable: false,
            hiding: false,
        },
    ];

    console.log("EditDataScalping?.PositionType", EditDataScalping)
    const RiskManagementArr = [
        {
            name: "Quantity",
            label: EditDataScalping?.PositionType == "Single" ? "Lot1" : "Lot",
            // showWhen: EditDataScalping?.PositionType == "Single",
            type: "text3",
            label_size: 12,
            col_size: formik.values.position_type == "Multiple" ? 3 : 4,
            headingtype: 4,
            hiding: false,
            disable: false,
        },
        {
            name: "quantity2",
            label: "Lot2",
            label_size: 12,
            showWhen: (values) => EditDataScalping?.PositionType == "Single",
            type: "text3",
            label_size: 12,
            col_size: 4,
            headingtype: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "quantity3",
            label: 'Lot3',
            type: "text3",
            label_size: 12,
            label_size: 12,
            showWhen: (values) => EditDataScalping?.PositionType == "Single",
            col_size: 4,
            headingtype: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "LowerRange",
            label: "Lower Range ",
            type: "text3",
            label_size: 12,
            col_size: formik.values.position_type == "Multiple" ? 3 : 4,
            headingtype: 4,
            showWhen: (values) => EditDataScalping?.PositionType == "Multiple",
            disable: false,
            hiding: false,
        },
        {
            name: "HigherRange",
            label: "Higher Range",
            type: "text3",
            label_size: 12,
            col_size: formik.values.position_type == "Multiple" ? 3 : 4,
            headingtype: 4,
            showWhen: (values) => EditDataScalping?.PositionType == "Multiple",
            disable: false,
            hiding: false,
        },
        {
            name: "HoldExit",
            label: "Hold/Exit",
            type: "select",
            options: [
                { label: "Hold", value: "Hold" },
                { label: "Exit", value: "Exit" },
            ],
            showWhen: (values) => EditDataScalping?.PositionType == "Multiple",
            label_size: 12,
            col_size: formik.values.position_type == "Multiple" ? 3 : 4,
            headingtype: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text3",
            label_size: 12,
            col_size: formik.values.position_type == "Multiple" ? 3 : 4,
            headingtype: 4,
            disable: false,
            hiding: false,
        },


    ];
    const TimeDurationArr = [
        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            headingtype: 5,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            headingtype: 5,
            disable: false,
            hiding: false,
        },

    ];



    const MultiConditionalField = [
        {
            name: "Heading",
            label: "Entry_Rule",
            type: "heading",
            hiding: false,
            label_size: 12,
            headingtype: 2,
            col_size: 12,
            data: EntryRuleArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
            disable: false,
        },
        {
            name: "Heading",
            label: "Risk_Management",
            type: "heading",
            hiding: false,
            label_size: 12,
            headingtype: 4,
            col_size: 12,
            data: RiskManagementArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
            disable: false,
        },
        {
            name: "Heading",
            label: "Exit_Rule",
            type: "heading",
            hiding: false,
            label_size: 12,
            col_size: 12,
            headingtype: 3,
            data: ExitRuleArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
            disable: false,
        },
        {
            name: "Heading",
            label: "Time_Duration",
            type: "heading",
            hiding: false,
            label_size: 12,
            col_size: 12,
            headingtype: 5,
            data: TimeDurationArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
            disable: false,
        },
        // {
        //     name: "Heading",
        //     label: "Other_Parameters",
        //     type: "heading",
        //     hiding: false,
        //     label_size: 12,
        //     col_size: 12,
        //     headingtype: 6,
        //     data: OtherParameterArr.filter(
        //         (item) => !item.showWhen || item.showWhen(formik.values)
        //     ),
        //     disable: false,
        // },
    ];

    const fields1 = [
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percentage", value: "Percentage" },
                { label: "Point", value: "Point" },
            ],

            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Quantity",
            label: "Lot Size",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },

        {
            name: "Slvalue",
            label: "Stoploss",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

    ];

    const fields2 = [
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percantage", value: "Percantage" },
                { label: "Point", value: "Point" },
            ],

            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Quantity",
            label: "Lot Size",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "Slvalue",
            label: "Stoploss",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

    ];

    useEffect(() => {
        if (data == "Scalping") {
            if (EditDataScalping?.ScalpType !== "Multi_Conditional") {

                console.log("1")
                formik.setFieldValue('EntryPrice', EditDataScalping.EntryPrice)
                formik.setFieldValue('EntryRange', EditDataScalping.EntryRange)
                formik.setFieldValue('TStype', EditDataScalping.TStype)
                formik.setFieldValue('Targetvalue', EditDataScalping['Booking Point'])
                formik.setFieldValue('Slvalue', EditDataScalping['Re-entry Point'])
                formik.setFieldValue('LowerRange', EditDataScalping.LowerRange)
                formik.setFieldValue('HigherRange', EditDataScalping.HigherRange)
                formik.setFieldValue('HoldExit', EditDataScalping.HoldExit)
                formik.setFieldValue('EntryTime', EditDataScalping.EntryTime)
                formik.setFieldValue('ExitTime', EditDataScalping.ExitTime)
                formik.setFieldValue('Quantity', EditDataScalping.Quantity)
                formik.setFieldValue('TradeCount', EditDataScalping.TradeCount)
            }

            else if (EditDataScalping?.ScalpType === "Multi_Conditional" && EditDataScalping?.PositionType == "Single") {

                console.log("2")
                MultiConditionFormik.setFieldValue('EntryPrice', EditDataScalping.EntryPrice)
                MultiConditionFormik.setFieldValue('EntryRange', EditDataScalping.EntryRange)
                MultiConditionFormik.setFieldValue('Quantity', EditDataScalping.Quantity)
                MultiConditionFormik.setFieldValue('quantity2', EditDataScalping.Quantity2)
                MultiConditionFormik.setFieldValue('quantity3', EditDataScalping.Quantity3)
                MultiConditionFormik.setFieldValue('TradeCount', EditDataScalping.TradeCount)
                MultiConditionFormik.setFieldValue('TStype', EditDataScalping.TStype)
                MultiConditionFormik.setFieldValue('Targetvalue', EditDataScalping['Booking Point'])
                MultiConditionFormik.setFieldValue('tgp2', EditDataScalping['Booking Point2'])
                MultiConditionFormik.setFieldValue('tgp3', EditDataScalping['Booking Point3'])
                MultiConditionFormik.setFieldValue('Slvalue', EditDataScalping['Re-entry Point'])
                MultiConditionFormik.setFieldValue('EntryTime', EditDataScalping.EntryTime)
                MultiConditionFormik.setFieldValue('ExitTime', EditDataScalping.ExitTime)

            }

            else if (EditDataScalping?.ScalpType === "Multi_Conditional" && EditDataScalping?.PositionType == "Multiple") {

                MultiConditionFormik.setFieldValue('EntryPrice', EditDataScalping.EntryPrice)
                MultiConditionFormik.setFieldValue('EntryRange', EditDataScalping.EntryRange)
                MultiConditionFormik.setFieldValue('Quantity', EditDataScalping.Quantity)
                MultiConditionFormik.setFieldValue('LowerRange', EditDataScalping.LowerRange)
                MultiConditionFormik.setFieldValue('HigherRange', EditDataScalping.HigherRange)
                MultiConditionFormik.setFieldValue('HoldExit', EditDataScalping.HoldExit)
                MultiConditionFormik.setFieldValue('TradeCount', EditDataScalping.TradeCount)
                MultiConditionFormik.setFieldValue('TStype', EditDataScalping.TStype)
                MultiConditionFormik.setFieldValue('Targetvalue', EditDataScalping['Booking Point'])
                MultiConditionFormik.setFieldValue('Slvalue', EditDataScalping['Re-entry Point'])
                MultiConditionFormik.setFieldValue('EntryTime', EditDataScalping.EntryTime)
                MultiConditionFormik.setFieldValue('ExitTime', EditDataScalping.ExitTime)


            }
        }
        else if (data == "Option Strategy") {
            formik1.setFieldValue('TStype', EditDataOption.strategytype)
            formik1.setFieldValue('Targetvalue', EditDataOption['Target value'])
            formik1.setFieldValue('Slvalue', EditDataOption['SL value'])
            formik1.setFieldValue('Quantity', EditDataOption['Lot Size'])
            formik1.setFieldValue('EntryTime', EditDataOption['Entry Time'])
            formik1.setFieldValue('ExitTime', EditDataOption['Exit Time'])
            formik1.setFieldValue('TradeCount', EditDataOption.TradeCount)
        }
        else if (data == "Pattern") {

            formik2.setFieldValue('TStype', EditDataPattern.TStype)
            formik2.setFieldValue('Targetvalue', EditDataPattern['Target value'])
            formik2.setFieldValue('Slvalue', EditDataPattern['SL value'])
            formik2.setFieldValue('Quantity', EditDataPattern.Quantity)
            formik2.setFieldValue('EntryTime', EditDataPattern.EntryTime)
            formik2.setFieldValue('ExitTime', EditDataPattern.ExitTime)
            formik2.setFieldValue('TradeCount', EditDataPattern.TradeCount)

        }
    }, [showEditModal, data, EditDataScalping])



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-body" style={{ padding: '3px' }}>
                            <div className="tab-content" id="myTabContent-3">

                                <div className="tab-pane fade show active" id="home-justify" role="tabpanel" aria-labelledby="home-tab-justify">
                                    {data && (
                                        <>
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">

                                                    {tableType === "MultiCondition" ? "" : <h4 className="card-title">{data}</h4>
                                                    }
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <button className='btn btn-primary mt-1' style={{ fontSize: '18px', padding: '6px 14px', height: "47px" }} onClick={() => AddScript(data)}>Add Script</button>
                                                </div>

                                            </div>
                                            <div className="iq-card-body " style={{ padding: '3px' }}>
                                                <div className="table-responsive">

                                                    {
                                                        getAllService.loading ? (
                                                            <Loader />
                                                        ) : (
                                                            (() => {
                                                                const hasPrimaryTableData =
                                                                    tableType === "Scalping" &&
                                                                    (
                                                                        (data === "Scalping" && getAllService.ScalpingData?.length > 0) ||
                                                                        (data === "Option Strategy" && getAllService.OptionData?.length > 0) ||
                                                                        (data === "Pattern" && getAllService.PatternData?.length > 0) ||
                                                                        (data === "ChartingPlatform" && getCharting?.length > 0)
                                                                    );

                                                                const hasSecondaryTableData =
                                                                    data === "Scalping" &&
                                                                    tableType === "MultiCondition" &&
                                                                    getAllService.NewScalping?.length > 0;

                                                                if (!hasPrimaryTableData && !hasSecondaryTableData) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "center",
                                                                                alignItems: "center",
                                                                                textAlign: "center",
                                                                                height: "200px",
                                                                            }}
                                                                        >
                                                                            <img src="/assets/images/no-record-found.png" width="30%" alt="No Record Found" />
                                                                        </div>
                                                                    );
                                                                }

                                                                return (
                                                                    <>
                                                                        {hasPrimaryTableData && (
                                                                            <FullDataTable
                                                                                columns={
                                                                                    data === "Scalping"
                                                                                        ? getColumns3(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                        : data === "Option Strategy"
                                                                                            ? getColumns4(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                            : data === "Pattern"
                                                                                                ? getColumns5(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                                : data === "ChartingPlatform"
                                                                                                    ? getColumns8(HandleContinueDiscontinue)
                                                                                                    : getColumns3(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                }
                                                                                data={
                                                                                    data === "Scalping"
                                                                                        ? getAllService.ScalpingData
                                                                                        : data === "Option Strategy"
                                                                                            ? getAllService.OptionData
                                                                                            : data === "Pattern"
                                                                                                ? getAllService.PatternData
                                                                                                : data === "ChartingPlatform"
                                                                                                    ? getCharting
                                                                                                    : []
                                                                                }
                                                                                checkBox={false}
                                                                            />
                                                                        )}

                                                                        {hasSecondaryTableData && (
                                                                            <div>
                                                                                <div className="iq-header-title mt-4">
                                                                                    <h4 className="card-title">Multi Conditional</h4>
                                                                                </div>
                                                                                <FullDataTable
                                                                                    columns={getColumns6(handleDelete, handleEdit, HandleContinueDiscontinue)}
                                                                                    data={getAllService.NewScalping}
                                                                                    checkBox={false}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                            })()
                                                        )
                                                    }


                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showEditModal && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content ">
                        <div className="modal-header ">
                            <h5 className="modal-title">Edit Script</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => { setShowEditModal(false); formik.resetForm(); formik1.resetForm(); formik2.resetForm(); MultiConditionFormik.resetForm(); }}
                            />
                        </div>

                        {
                            data == "Scalping" ? <>
                                <Formikform
                                    fields={(EditDataScalping?.ScalpType == "Multi_Conditional" ? MultiConditionalField : fields).filter(
                                        (field) => !field.showWhen || field.showWhen(EditDataScalping?.ScalpType == "Multi_Conditional" ? MultiConditionFormik.values : formik.values)
                                    )}

                                    btn_name="Update"
                                    formik={EditDataScalping?.ScalpType == "Multi_Conditional" ? MultiConditionFormik : formik}
                                />
                            </> :
                                data == "Option Strategy" ? <>

                                    <Formikform
                                        fields={fields1}
                                        btn_name="Update"
                                        formik={formik1}
                                    />
                                </>
                                    :
                                    <Formikform
                                        fields={fields2.filter(
                                            (field) => !field.showWhen || field.showWhen(formik2.values)
                                        )}
                                        btn_name="Update"
                                        formik={formik2}
                                    />
                        }
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Coptyscript;
