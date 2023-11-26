import React from "react";
import Navigator from "./Navigator";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <div className="container">
            <Navigator />
            <ToastContainer />
        </div>
    );
};

export default App;
