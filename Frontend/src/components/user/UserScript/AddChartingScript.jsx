import React, { useState, useEffect } from "react";
import {
  addChartingScript,
  getChargingPlatformDataApi,
} from "../../CommonAPI/User";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddChartingScript = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");

  // const [chartingData, setChartingData] = useState([
  //   { name: "Cash", Status: false, Fund: "", TradeCount: "" },
  //   { name: "Future", Status: false, Fund: "", TradeCount: "" },
  //   { name: "Option", Status: false, Fund: "", TradeCount: "" },
  // ]);

  const [chartingData, setChartingData] = useState([]);

  console.log("chartingData", chartingData);
  const getChartingData = async () => {
    const res = await getChargingPlatformDataApi(userName);
    console.log("apires is ", res.Client);
    setChartingData(res.Client);
  };

  //   const [viewChartingData, setViewChartingData] = useState([]);

  useEffect(() => {
    getChartingData();
  }, []);

  const cards = [
    { name: "Cash", type: "cash", Status: false, Fund: "", TradeCount: "" },
    { name: "Future", type: "future", Status: true, lot: "", TradeCount: "" },
    {
      name: "Option",
      type: "option",
      Status: false,
      Fund: "",
      TradeCount: "",
    },
  ];

  const handleAddCharting = async (index) => {
    const data = chartingData[index];
    console.log("data is", data);
    const req = {
      Username: userName,
      Status: data.Status,
      Fund: index == 0 ? Number(data.Fund) : 0,
      Lot: index == 0 ? 0 : Number(data.Fund),
      Segment: data.Segment,
      TradeCount: Number(data.TradeCount),
    };
    console.log("req", req);
    
    await addChartingScript(req)
      .then((response) => {
        if (response.Status) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            timer: 1500,
            timerProgressBar: true,
          });
          //   setTimeout(() => {
          //     navigate("/user/dashboard");
          //   }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error in adding the charting data", err);
      });
  };

  return (
    <div className="iq-card">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary m-3"
          onClick={() => navigate("/user/dashboard")}>
          Back
        </button>
      </div>
      <div className="row">
        {cards.map((item, index) => {
          return (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card">
                <div className="card-header text-center">
                  <h5>{item.name}</h5>
                </div>
                <div className="card-body">
                  <div className="col-sm-7 d-flex">
                    <span className="me-3">Status:</span>
                    <div className="form-switch">
                      <input
                        className="form-check-input"
                        style={{
                          width: "50px",
                          height: "20px",
                        }}
                        type="checkbox"
                        id={`flexSwitchCheckChecked-${index}`} // Unique ID for each input
                        name={`status-${index}`}
                        checked={chartingData[index]?.Status === "On"} // Reflect the correct "On"/"Off" state
                        onChange={(e) => {
                          const updatedData = [...chartingData];
                          updatedData[index].Status = e.target.checked
                            ? "On"
                            : "Off"; // Update based on checkbox state
                          setChartingData(updatedData); // Update the state
                          console.log(
                            "Updated status:",
                            updatedData[index].Status
                          ); // Log for debugging
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label>{item.type === "cash" ? "Fund" : "Lot"}</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter funds"
                      onChange={(e) => {
                        const data = {
                          ...chartingData,
                        };
                        data[index].Fund = e.target.value;
                        setChartingData(data);
                      }}
                      value={chartingData[index]?.Fund}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Trade Count</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter trade count"
                      onChange={(e) => {
                        const data = {
                          ...chartingData,
                        };
                        data[index].TradeCount = e.target.value;
                        setChartingData(data);
                      }}
                      value={chartingData[index]?.TradeCount}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddCharting(index)}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddChartingScript;
