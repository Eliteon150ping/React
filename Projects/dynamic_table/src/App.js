import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DynamicTable from "./dynamic-table/DynamicTable";

class App extends React.Component {
  render() {
    return (
      <DynamicTable />
    );
  }
}

export default App;
