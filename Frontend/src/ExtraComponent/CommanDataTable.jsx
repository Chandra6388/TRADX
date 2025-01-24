// import React, { useState } from "react";
// import MUIDataTable from "mui-datatables";

// const FullDataTable = ({ data, columns, onRowSelect, checkBox }) => {
//     const [selectedRowData, setSelectedRowData] = useState(null);

//     const NoDataIndication = () => (
//         <div className="d-flex justify-content-start">
//             <img
//                 src='../../../../assets/images/norecordfound.png'
//                 alt="No data found"
//                 style={{marginLeft:'23rem'}}
//             />
//         </div>
//     );

//     const options = {
//         responsive: "vertical",  // Improved responsive behavior for mobile view
//         filterType: false,
//         selectableRowsHeader: false,
//         selectableRows: checkBox ? "single" : "none",
//         onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
//             if (allRowsSelected.length > 0) {
//                 const selectedIndex = allRowsSelected[0].index;
//                 const rowData = data[selectedIndex];
//                 setSelectedRowData(rowData);
//                 onRowSelect(rowData); // Call the callback function with selected row data
//             } else {
//                 setSelectedRowData(null);
//                 onRowSelect(null); // Call the callback function with null
//             }
//         },
//         rowsSelected: selectedRowData ? [data.indexOf(selectedRowData)] : [],
//         customToolbarSelect: () => { },
//         textLabels: {
//             body: {
//                 noMatch: NoDataIndication(),
//                 toolTip: "Sort",
//             },
//             pagination: {
//                 next: "Next Page",
//                 previous: "Previous Page",
//                 rowsPerPage: "Rows per page:",
//                 displayRows: "of",
//             },
//             selectedRows: {
//                 text: "row(s) selected",
//             },
//         },
//         download: false,
//         print: false,
//         viewColumns: false,
//         search: false,
//         filter: false,
//         setCellProps: () => ({
//             style: {
//                 textAlign: 'center',
//             }
//         }),
//         rowsPerPageOptions: [10, 25, 50, 100],
//     };

//     const customizedColumns = columns.map(column => ({
//         ...column,
//         options: {
//             ...column.options,
//             setCellProps: () => ({
//                 style: {
//                     width: column.width || 'auto',
//                     minWidth: '100px',
//                 }
//             })
//         }
//     }));

//     return (
//         <div className="modal-body">
//             <MUIDataTable
//                 title={""}
//                 data={data}
//                 columns={customizedColumns}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default FullDataTable;

// // ___________Testing on table with expand/collapse feature___________

// import React, { useState } from "react";
// import MUIDataTable from "mui-datatables";

// const FullDataTable = ({ data, columns, onRowSelect, checkBox }) => {
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false); // State to track expanded/collapsed

//   const NoDataIndication = () => (
//     <div className="d-flex justify-content-start">
//       <img
//         src="../../../../assets/images/norecordfound.png"
//         alt="No data found"
//         style={{ marginLeft: "23rem" }}
//       />
//     </div>
//   );

//   const toggleExpandCollapse = () => {
//     setIsExpanded(!isExpanded); // Toggle expanded state
//   };

//   const options = {
//     responsive: "vertical",
//     filterType: false,
//     selectableRowsHeader: false,
//     selectableRows: checkBox ? "single" : "none",
//     onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
//       if (allRowsSelected.length > 0) {
//         const selectedIndex = allRowsSelected[0].index;
//         const rowData = data[selectedIndex];
//         setSelectedRowData(rowData);
//         onRowSelect(rowData);
//       } else {
//         setSelectedRowData(null);
//         onRowSelect(null);
//       }
//     },
//     rowsSelected: selectedRowData ? [data.indexOf(selectedRowData)] : [],
//     customToolbarSelect: () => {},
//     textLabels: {
//       body: {
//         noMatch: NoDataIndication(),
//         toolTip: "Sort",
//       },
//       pagination: {
//         next: "Next Page",
//         previous: "Previous Page",
//         rowsPerPage: "Rows per page:",
//         displayRows: "of",
//       },
//       selectedRows: {
//         text: "row(s) selected",
//       },
//     },
//     download: false,
//     print: false,
//     viewColumns: false,
//     search: false,
//     filter: false,
//     setCellProps: () => ({
//       style: {
//         textAlign: "center",
//       },
//     }),
//     rowsPerPageOptions: [10, 25, 50, 100],
//   };

//   // Conditionally show only the first 6 columns or all columns based on isExpanded
//   const visibleColumns = isExpanded ? columns : columns.slice(0, 6);

//   const customizedColumns = visibleColumns.map((column) => ({
//     ...column,
//     options: {
//       ...column.options,
//       setCellProps: () => ({
//         style: {
//           width: column.width || "auto",
//           minWidth: "100px",
//         },
//       }),
//     },
//   }));

//   return (
//     <div className="modal-body">
//       <div style={{ marginBottom: "10px", textAlign: "right" }}>
//         <button onClick={toggleExpandCollapse} className="btn btn-primary">
//           {isExpanded ? "Collapse Columns" : "Expand Columns"}
//         </button>
//       </div>
//       <MUIDataTable
//         title={""}
//         data={data}
//         columns={customizedColumns}
//         options={options}
//       />
//     </div>
//   );
// };

// export default FullDataTable;

// ______________________________new€Table

import React, { useState, useCallback, useMemo, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const FullDataTable = ({ data, columns, onRowSelect, checkBox }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(columns.slice(0, 6));
  const [tempSelectedColumns, setTempSelectedColumns] = useState(
    columns.slice(0, 6)
  );

  useEffect(() => {
    setSelectedColumns(columns.slice(0, 6)); // Reset selected columns to default
    setTempSelectedColumns(columns.slice(0, 6)); // Reset temp selected columns
  }, [columns]);

  // Memoized modal handlers
  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  const handleColumnChange = useCallback(
    (columnName) => {
      const columnToAdd = columns.find((col) => col.name === columnName);
      if (tempSelectedColumns.some((col) => col.name === columnName)) {
        setTempSelectedColumns((prev) =>
          prev.filter((col) => col.name !== columnName)
        );
      } else if (columnToAdd) {
        setTempSelectedColumns((prev) => [...prev, columnToAdd]);
      }
    },
    [columns, tempSelectedColumns]
  );

  // useEffect(() => {
  //   console.log("Columns Updated:", columns);
  //   console.log("Data Updated:", data);
  //   console.log("Selected Columns:", selectedColumns);
  // }, [columns, data, selectedColumns]);

  const handleSubmit = useCallback(() => {
    setSelectedColumns(tempSelectedColumns);
    handleModalClose();
  }, [tempSelectedColumns, handleModalClose]);

  const options = useMemo(
    () => ({
      responsive: "vertical",
      selectableRows: checkBox ? "single" : "none",
      onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
        if (allRowsSelected.length > 0) {
          const selectedIndex = allRowsSelected[0].index;
          const rowData = data[selectedIndex];
          setSelectedRowData(rowData);
          if (onRowSelect) onRowSelect(rowData);
        } else {
          setSelectedRowData(null);
          if (onRowSelect) onRowSelect(null);
        }
      },
      rowsSelected: selectedRowData ? [data.indexOf(selectedRowData)] : [],
      download: false,
      print: false,
      viewColumns: false,
      search: false,
      filter: false,
      sort: false,
      setCellProps: () => ({
        style: { textAlign: "center" },
      }),
      rowsPerPageOptions: [10, 25, 50, 100],
    }),
    [data, selectedRowData, onRowSelect, checkBox]
  );

  const visibleColumns = useMemo(
    () =>
      selectedColumns.concat({
        name: "Action",
        label: (
          <button
            onClick={handleModalOpen}
            style={{ backgroundColor: "black !important" }}
            className="btn btn-secondary">
            Expand Columns
          </button>
        ),
        options: {
          filter: false,
          sort: false,
          setCellProps: () => ({
            style: { textAlign: "center", minWidth: "120px" },
          }),
        },
      }),
    [selectedColumns, handleModalOpen]
  );

  const customizedColumns = useMemo(
    () =>
      visibleColumns.map((column) => ({
        ...column,
        options: {
          ...column.options,
          sort: false,
          setCellProps: () => ({
            style: { width: column.width || "auto", minWidth: "100px" },
          }),
          setHeaderProps: () => ({
            style: {
              pointerEvents: column.name === "Action" ? "auto" : "none",
              cursor: column.name === "Action" ? "pointer" : "default",
            },
          }),
        },
      })),
    [visibleColumns]
  );

  // Handle 'Select All' checkbox
  const handleSelectAllChange = useCallback(() => {
    if (tempSelectedColumns.length === columns.length) {
      // If all columns are selected, reset to default selected columns
      setTempSelectedColumns(columns.slice(0, 6)); // Adjust default columns here
    } else {
      // Otherwise, select all columns
      setTempSelectedColumns(columns);
    }
  }, [columns, tempSelectedColumns]);

  return (
    <div className="modal-body">
      <div className="table-container">
        <MUIDataTable
          title={""}
          data={data}
          columns={customizedColumns}
          options={options}
        />
      </div>
      <Modal
        show={isModalOpen}
        onHide={handleModalClose}
        className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Select Columns to Display</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 mb-2">
              {/* Select All Checkbox */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="select-all"
                  checked={tempSelectedColumns.length === columns.length}
                  onChange={handleSelectAllChange}
                />
                <label className="form-check-label" htmlFor="select-all">
                  Select All
                </label>
              </div>
            </div>

            <div className="col-6">
              {columns.slice(0, Math.ceil(columns.length / 2)).map((column) => (
                <div key={column.name} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`column-${column.name}`}
                    checked={tempSelectedColumns.some(
                      (col) => col.name === column.name
                    )}
                    onChange={() => handleColumnChange(column.name)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`column-${column.name}`}>
                    {column.label || column.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="col-6">
              {columns.slice(Math.ceil(columns.length / 2)).map((column) => (
                <div key={column.name} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`column-${column.name}`}
                    checked={tempSelectedColumns.some(
                      (col) => col.name === column.name
                    )}
                    onChange={() => handleColumnChange(column.name)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`column-${column.name}`}>
                    {column.label || column.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "black" }}
            onClick={handleModalClose}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: "green" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>{`
        .table-container {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
        .expand-btn {
          background: linear-gradient(135deg, #4caf50, #81c784);
          color: white;
          font-weight: bold;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          transition: 0.3s ease;
        }
        .expand-btn:hover {
          background: linear-gradient(135deg, #388e3c, #66bb6a);
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
        }
        .custom-modal .modal-content {
          background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
        }
        .custom-modal .modal-header {
          border-bottom: 1px solid #ccc;
        }
        .custom-modal .modal-footer {
          border-top: 1px solid #ccc;
        }
      `}</style>
    </div>
  );
};

export default FullDataTable;
