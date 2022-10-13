import React from "react";
import "./App.sass";
import RowsList from "./components/RowsList";
import Header from "./components/UI/Header/Header";
import SideBar from "./components/UI/SideBar/SideBar";
function App() {
    return (
        <>
            <Header />
            <div className="container">
                <SideBar />
                <RowsList />
            </div>
        </>
    );
}

export default App;
