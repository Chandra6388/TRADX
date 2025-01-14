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
  const [chartingData, setChartingData] = useState([]);

  const getChartingData = async () => {
    const res = await getChargingPlatformDataApi(userName);
    setChartingData(res.Client);
  };

  useEffect(() => {
    getChartingData();
  }, []);

  const cards = [
    { name: "Cash", type: "Cash", Status: false, Fund: "", TradeCount: "" },
    { name: "Future", type: "Future", Status: true, lot: "", TradeCount: "" },
    { name: "Option", type: "Option", Status: false, Fund: "", TradeCount: "", },
  ];

  const handleAddCharting = async (index) => {
    const data = chartingData[index];


    const req = {
      Username: userName,
      Status: data.Status,
      Fund: data.Segment == "Cash" ? Number(data.Fund) : 0,
      Lot: data.Segment == "Cash" ? 0 : Number(data.Quantity),
      Segment: data.Segment,
      TradeCount: Number(data.TradeCount),
    };
   
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
                        id={`flexSwitchCheckChecked-${index}`}
                        name={`status-${index}`}
                        checked={chartingData[index]?.Status === "On"}
                        onChange={(e) => {
                          const updatedData = [...chartingData];
                          updatedData[index].Status = e.target.checked
                            ? "On"
                            : "Off";
                          setChartingData(updatedData);
                          console.log(
                            "Updated status:",
                            updatedData[index].Status
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label>{item.type === "Cash" ? "Fund" : "Lot"}</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder={item.type === "Cash" ? "Enter Fund" : "Enter Lot"}
                      onChange={(e) => {
                        const updatedData = [...chartingData];
                        if (item.type === "Cash") {
                          updatedData[index] = {
                            ...updatedData[index],
                            Fund: e.target.value,
                          };
                        } else {
                          updatedData[index] = {
                            ...updatedData[index],
                            Quantity: e.target.value,
                          };
                        }
                        setChartingData(updatedData);
                      }}
                      value={item.type === "Cash" ? chartingData[index]?.Fund || '' : chartingData[index]?.Quantity || ''}
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
