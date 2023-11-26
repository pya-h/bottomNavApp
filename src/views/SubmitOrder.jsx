import React from "react";
import { useState } from "react";
import "./style.css";
import Responses from "../tools/responses";
import services from "../tools/services";
import { SuccessToast, FailureToast } from "../tools/notification.js";

const SubmitOrder = () => {
    const [product_type, $product_type] = useState("");
    const [weight, $weight] = useState(null);
    const [vehicle_type, $vehicle_type] = useState("");
    const [loading_location, $loading_location] = useState("");
    const [unloading_loc, $unloading_loc] = useState("");
    const [border_passage, $border_passage] = useState("");
    const [loading_date, $loading_date] = useState("");
    const [loading_hour, $loading_hour] = useState(null);
    const [description, $description] = useState("");
    const [trader, $trader] = useState("");
    const [petre_seller_co, $petre_seller_co] = useState("");

    const [btnSubmitHovered, $btnSubmitHovered] = useState(false);

    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const order = {
                product_type,
                weight: +weight,
                vehicle_type,
                loading_location,
                unloading_loc,
                border_passage,
                loading_date: new Date(loading_date),
                loading_hour: +loading_hour,
                description,
                trader,
                petre_seller_co,
            };

            const { status, data } = await services.submitOrder(order);

            if (status === Responses.CreatedSuccessfully) {
                SuccessToast("سفارش با موفقیت ثبت شد");
                console.log(data);
            }
        } catch (err) {
            // console.log(err);
            if (!Responses.isErrorExpected(err)) {
                FailureToast(
                    "ثبت سفارش با مشکل رو به رو شد. لطفا دوباره تلاش کتید"
                );
            }
            else if(Responses.NotFound === err.response.status) {
                FailureToast("سرور شناسایی نشد! لطفا ارتباط خود به اینترنت را بررسی نمایید.")
            }
        }
    };
    return (
        <form onSubmit={(event) => onFormSubmit(event)}>
            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="نوع کالا"
                    value={product_type}
                    required="required"
                    onChange={(e) => $product_type(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="وزن"
                    value={weight}
                    required="required"
                    onChange={(e) => $weight(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="نوع ناوگان"
                    value={vehicle_type}
                    autoComplete="username"
                    required="required"
                    onChange={(e) => $vehicle_type(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="txt"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="محل بارگیری"
                    value={loading_location}
                    required="required"
                    onChange={(e) => $loading_location(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="محل تخلیه"
                    value={unloading_loc}
                    required="required"
                    onChange={(e) => $unloading_loc(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="تاریخ بارگیری"
                    value={loading_date}
                    required="required"
                    onChange={(e) => $loading_date(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="نام اعلام کننده بار"
                    value={trader}
                    required="required"
                    onChange={(e) => $trader(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="ساعت بارگیری"
                    value={loading_hour}
                    required="required"
                    onChange={(e) => $loading_hour(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <textarea
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="توضیحات"
                    value={description}
                    required="required"
                    rows={4}
                    onChange={(e) => $description(e.target.value)}
                />
            </div>
            <hr />
            <div className="row mb-3 mx-3">
                <div className="col-6 mx-auto">
                    <button
                        onMouseEnter={() => $btnSubmitHovered(true)}
                        onMouseLeave={() => $btnSubmitHovered(false)}
                        type="submit"
                        className={`btn btn-outline-${
                            btnSubmitHovered ? "success" : "secondary"
                        } btn-large p-3 btn-block text-bold btn-bounce`}
                    >
                        <i
                            className="fa fa-user-plus px-2"
                            aria-hidden="true"
                        ></i>
                        تایید
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SubmitOrder;
