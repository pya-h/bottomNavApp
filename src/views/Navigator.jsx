import React, { useState } from "react";

import Profile from "./Profile";
import SubmitOrder from "./SubmitOrder";
import "./style.css";
import { useMediaQuery } from "react-responsive";
const tabNames = {
    profile: "پروفایل",
    order: "ثبت سفارش",
    recent: "فعالیت های اخیر",
    messages: "پیام ها",
};
const Navigator = () => {
    const [tab, setTab] = useState("profile");
    const deviceIsDesktop = useMediaQuery({
        query: "screen and (min-width: 968px",
    });
    const deviceIsTablet = useMediaQuery({
        query: "screen and (min-width: 750px",
    });

    return (
        <>
            <div border="success" className="order-card float-center">
                <div className="card-header bg-transparent text-center border-success">
                    {tabNames[tab]}
                </div>
                <div className="card-body">
                    {Boolean(tab.toLowerCase() === "profile") && <Profile />}
                    {Boolean(tab.toLowerCase() === "order") && <SubmitOrder />}
                </div>
                <div
                    className={`order-form m-0 ${
                        !deviceIsTablet ? "w-100" : ""
                    }`}
                    style={{
                        borderRadius: "25px 25px 0 0",
                        left: deviceIsDesktop
                            ? "36%"
                            : deviceIsTablet
                            ? "18%"
                            : "0",
                        position: "fixed",
                        margin: "0",
                        padding: "0",
                        bottom: "0",
                        backgroundColor: "lightgrey",
                    }}
                >
                    <div className="row">
                        <div
                            onClick={() => setTab("profile")}
                            className="col px-md-5 btn-tab"
                        >
                            <span
                                className="text-center mx-auto"
                                style={{
                                    color:
                                        tab.toLowerCase() === "profile"
                                            ? "royalblue"
                                            : "black",
                                }}
                            >
                                <i
                                    style={{ fontSize: "30px" }}
                                    className="fa fa-user-circle"
                                    aria-hidden="true"
                                ></i>
                                <br />
                                پروفایل
                            </span>
                        </div>
                        <div
                            onClick={() => setTab("order")}
                            className="col px-md-5 mx-1 btn-tab"
                        >
                            <span
                                className="text-center mx-auto"
                                style={{
                                    color:
                                        tab.toLowerCase() === "order"
                                            ? "royalblue"
                                            : "black",
                                }}
                            >
                                <i
                                    style={{ fontSize: "30px" }}
                                    className="fa fa-list-alt"
                                    aria-hidden="true"
                                ></i>
                                <br />
                                سفارش
                            </span>
                        </div>
                        <div
                            onClick={() => setTab("recent")}
                            className="col px-md-5 mx-1 btn-tab ml-1"
                        >
                            <span
                                className="text-center mx-auto"
                                style={{
                                    fontSize: "12px",
                                    color:
                                        tab.toLowerCase() === "recent"
                                            ? "royalblue"
                                            : "black",
                                }}
                            >
                                <i
                                    style={{ fontSize: "30px" }}
                                    className="fa fa-history"
                                    aria-hidden="true"
                                ></i>
                                <br />
                                فعالیتهای اخیر
                            </span>
                        </div>
                        <div
                            onClick={() => setTab("messages")}
                            className="col px-md-5 ml-1 btn-tab"
                        >
                            <span
                                className="text-center mx-auto"
                                style={{
                                    color:
                                        tab.toLowerCase() === "messages"
                                            ? "royalblue"
                                            : "black",
                                }}
                            >
                                <i
                                    style={{ fontSize: "30px" }}
                                    className="fa fa-weixin"
                                    aria-hidden="true"
                                ></i>
                                <br />
                                پیام ها
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigator;
