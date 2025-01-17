import React, { useState, useEffect } from "react";
import { get_User_Data } from "../../CommonAPI/Admin";
import {
  ChartingPlatformsegment,
  get_Trade_Response,
  getChargingPlatformDataApi,
  getStrategyType,
} from "../../CommonAPI/User";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Eye } from "lucide-react";
import { Modal, Button } from "react-bootstrap";

import {
  columns3,
  columns2,
  columns1,
  columns,
  columns5,
  columns4,
  columns6,
  columns7,
  columns8,
} from "./TradeReponseColumn";
const TradeResponse = () => {
  const userName = localStorage.getItem("name");

  const [selectStrategyType, setSelectStrategyType] = useState("Scalping");
  const [strategyType, setStrategyType] = useState([]);
  const [tradeHistory, setTradeHistory] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [selectedRowData, setSelectedRowData] = useState("");
  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [chartingData, setChartingData] = useState([]);

  const [getAllTradeData, setAllTradeData] = useState({
    loading: true,
    data: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (data) => {
    setModalData(data); // Set the data to display in the modal
    setShowModal(true);
  };

  const Username = localStorage.getItem("name");
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // from date
  const DefultToDate = new Date();

  DefultToDate.setDate(DefultToDate.getDate() + 1);
  const year1 = DefultToDate.getFullYear();
  const month1 = String(DefultToDate.getMonth() + 1).padStart(2, "0");
  const day1 = String(DefultToDate.getDate()).padStart(2, "0");
  const Defult_To_Date = `${year1}.${month1}.${day1}`;

  const columns7 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },

    {
      name: "Segment",
      label: "Segment",
      options: {
        filter: true,
        sort: true,
      },
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
                const data = chartingData[rowIndex];
                //   console.log("Data is ", data);
                handleSubmitForCharting(data);
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}>
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
      },
    },

    {
      name: "Status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Fund",
      label: "Fund",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TradeCount",
      label: "TradeCount",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns8 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
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
                const data = chartingData[rowIndex];
                console.log("Data is", data);
                handleShow(data);
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}>
              <Eye color="#007BFF" size={20} />
            </button>
          );
        },
      },
    },

    {
      name: "AccType",
      label: "Account Type",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "EntryTime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Exchange",
      label: "Exchange",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Exittime",
      label: "Exit Time",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Lotsize",
      label: "Lot Size",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Optiontype",
      label: "Option Type ",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Ordertype",
      label: "Order Type",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Planname",
      label: "Plan Name",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Sl",
      label: "Sl",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TSymbol",
      label: "TSymbol",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TType",
      label: "TType",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Token",
      label: "Token",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Trading",
      label: "Trading",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const getChartingData = async () => {
    const res = await getChargingPlatformDataApi(userName);
    setChartingData(res.Client);
  };

  useEffect(() => {
    getChartingData();
  }, []);

  // Date Formetor
  const convertDateFormat = (date) => {
    if (date == "") {
      return "";
    }
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const GetTradeStrategyType = async () => {
    try {
      const res = await getStrategyType();
      if (res) {
        setStrategyType(res.Data);
      }
    } catch (error) {
      setStrategyType([]);
      console.log("Error in finding the Strategy Type", error);
    }
  };

  const GetTradeResposne = async () => {
    const data = { Data: selectStrategyType, Username: Username };

    //GET TRADEHISTORY
    await get_User_Data(data)
      .then((response) => {
        if (response.Status) {
          const filterLiveTrade = response.Data.filter((item) => {
            return item.TradeExecution == "Live Trade";
          });
          const filterLiveTrade1 =
            selectStrategyType != "Scalping"
              ? []
              : response?.NewScalping?.filter((item) => {
                  return item.TradeExecution == "Live Trade";
                });

          setTradeHistory({
            loading: false,
            data: filterLiveTrade,
            data1: filterLiveTrade1,
          });
        } else {
          setTradeHistory({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });
  };
  useEffect(() => {
    GetTradeResposne();
  }, [selectStrategyType, FromDate, ToDate]);

  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleSubmitForCharting = async (data) => {
    // const {Username, Segment} = data;
    // console.log("username ans ", Username, Segment)
    await ChartingPlatformsegment(data)
      .then((response) => {
        if (response.Status) {
          setAllTradeData({
            loading: false,
            data: response.Client,
          });
          setShowTable(true);
        } else {
          Swal.fire({
            title: "No Records found",
            icon: "info",
            timer: 1500,
            timerProgressBar: true,
          });
          setAllTradeData({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });
  };

  const handleSubmit = async () => {
    const data = {
      MainStrategy:
        selectStrategyType == "Scalping" &&
        selectedRowData.ScalpType == "Multi_Conditional"
          ? "NewScalping"
          : selectStrategyType,
      Strategy:
        selectStrategyType == "Scalping" &&
        selectedRowData.ScalpType != "Multi_Conditional"
          ? selectedRowData && selectedRowData.ScalpType
          : selectStrategyType == "Option Strategy"
            ? selectedRowData && selectedRowData.STG
            : selectStrategyType == "Pattern"
              ? selectedRowData && selectedRowData.TradePattern
              : selectStrategyType == "Scalping" &&
                  selectedRowData.ScalpType == "Multi_Conditional"
                ? selectedRowData && selectedRowData.Targetselection
                : "",
      Symbol:
        selectStrategyType == "Scalping" || selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.Symbol
          : selectStrategyType == "Option Strategy"
            ? selectedRowData && selectedRowData.IName
            : "",
      Username: Username,
      ETPattern:
        selectStrategyType == "Scalping"
          ? ""
          : selectStrategyType == "Option Strategy"
            ? selectedRowData && selectedRowData.Targettype
            : selectStrategyType == "Pattern"
              ? selectedRowData && selectedRowData.Pattern
              : "",
      Timeframe:
        selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.TimeFrame
          : "",
      From_date: convertDateFormat(FromDate == "" ? formattedDate : FromDate),
      To_date: convertDateFormat(ToDate == "" ? Defult_To_Date : ToDate),
      Group:
        selectStrategyType == "Scalping" ||
        selectStrategyType == "Option Strategy"
          ? selectedRowData && selectedRowData.GroupN
          : "",
      TradePattern: "",
      PatternName: "",
    };

    await get_Trade_Response(data)
      .then((response) => {
        if (response.Status) {
          setAllTradeData({
            loading: false,
            data: response.Data,
          });
          setShowTable(true);
        } else {
          Swal.fire({
            title: "No Records found",
            icon: "info",
            timer: 1500,
            timerProgressBar: true,
          });
          setAllTradeData({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });
  };

  useEffect(() => {
    setSelectStrategyType("Scalping");
    GetTradeStrategyType();
  }, []);

  useEffect(() => {
    setShowTable(false);
  }, [selectStrategyType, FromDate, ToDate, selectedRowData]);

  return (
    <div>
      Modal: (
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        style={{
          width: "100vw", // Full viewport width
          padding: "0", // Remove padding
          display: "flex", // Use flexbox for centering and alignment
          justifyContent: "center", // Center horizontally
          alignItems: "center",
          // Center vertically
        }}>
        <div
          style={{
            width: "90vw", // 90% of the viewport width
            height: "90vh",
            marginLeft: "-20rem", // Remove margin
            // 90% of the viewport height
            backgroundColor: "#fff", // Modal background
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow for better appearance
            overflowX: "auto", // Clip content overflow
            overflowY: "auto", // Clip content overflow
          }}>
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#f8f9fa", // Light gray background for header
              borderBottom: "1px solid #dee2e6",
              padding: "10px 20px", // Adjust padding
            }}>
            <Modal.Title style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              Charting Data Details
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              height: "calc(90vh - 130px)", // Dynamic height based on modal size
              width: "100%", // Full width
              overflowY: "auto", // Enable vertical scrolling
              overflowX: "auto", // Enable horizontal scrolling
              padding: "15px", // Add padding for content
              backgroundColor: "#fdfdfd", // Subtle background for body
            }}>
            {modalData ? (
              <div
                style={{
                  minWidth: "100%", // Ensures content takes full width
                  display: "block", // Ensures table does not collapse
                  overflowX: "auto", // Allow horizontal scrolling
                }}>
                <GridExample
                  columns={
                    selectStrategyType === "Scalping"
                      ? columns
                      : selectStrategyType === "Option Strategy"
                        ? columns1
                        : selectStrategyType === "Pattern"
                          ? columns2
                          : selectStrategyType === "ChartingPlatform"
                            ? columns7
                            : columns
                  }
                  data={
                    selectStrategyType === "ChartingPlatform"
                      ? chartingData
                      : tradeHistory?.data
                  }
                  onRowSelect={handleRowSelect}
                  checkBox={
                    selectStrategyType === "ChartingPlatform" ? false : true
                  }
                />
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "#666" }}>
                No data available.
              </p>
            )}
          </Modal.Body>

          <Modal.Footer
            style={{
              backgroundColor: "#f8f9fa", // Light gray background for footer
              borderTop: "1px solid #dee2e6",
              justifyContent: "flex-end",
              padding: "10px 20px",
            }}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      ),
      <div className="container-fluid">
        <div className="row">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Trade Response</h4>
              </div>
            </div>
            <div className="iq-card-body">
              <div className="was-validated ">
                <div className="row">
                  <div className="form-group col-lg-4">
                    <label>Select Strategy Type</label>
                    <select
                      className="form-select"
                      required
                      onChange={(e) => setSelectStrategyType(e.target.value)}
                      value={selectStrategyType}>
                      {strategyType.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-lg-4">
                    <label>Select form Date</label>
                    <DatePicker
                      className="form-select"
                      selected={FromDate == "" ? formattedDate : FromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </div>
                  <div className="form-group col-lg-4">
                    <label>Select To Date</label>
                    <DatePicker
                      className="form-select"
                      selected={ToDate == "" ? Defult_To_Date : ToDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </div>
                </div>
              </div>
              {
                <div className="modal-body">
                  <GridExample
                    columns={
                      selectStrategyType === "Scalping"
                        ? columns
                        : selectStrategyType === "Option Strategy"
                          ? columns1
                          : selectStrategyType === "Pattern"
                            ? columns2
                            : selectStrategyType === "ChartingPlatform"
                              ? columns7
                              : columns
                    }
                    data={
                      selectStrategyType === "ChartingPlatform"
                        ? chartingData
                        : tradeHistory?.data
                    }
                    onRowSelect={handleRowSelect}
                    checkBox={
                      selectStrategyType === "ChartingPlatform" ? false : true
                    }
                  />
                </div>
              }

              {selectStrategyType == "Scalping" && (
                <div>
                  <div className="iq-header-title mt-4">
                    <h4 className="card-title">Multi Conditional</h4>
                  </div>
                  {
                    <div className="modal-body">
                      <GridExample
                        columns={columns6}
                        data={tradeHistory?.data1}
                        onRowSelect={handleRowSelect}
                        checkBox={true}
                      />
                    </div>
                  }
                </div>
              )}
              {selectStrategyType === "ChartingPlatform" ? (
                ""
              ) : (
                <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                  Submit
                </button>
              )}
              {showTable && (
                <>
                  <div className="mt-3">
                    <GridExample
                      columns={
                        selectStrategyType === "Scalping"
                          ? columns3
                          : selectStrategyType === "Option Strategy"
                            ? columns4
                            : selectStrategyType === "ChartingPlatform"
                              ? columns8
                              : columns5
                      }
                      data={getAllTradeData.data}
                      onRowSelect={handleRowSelect}
                      checkBox={false}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeResponse;
