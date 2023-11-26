import React from "react";
import { useState } from "react";
import { FailureToast, SuccessToast } from "../tools/notification";
import Responses from "../tools/responses";
import services from "../tools/services";
import "./style.css";

const CompanyTypes = ["شرکت ایرانی", "نماینده شرکت خارجی"];

const Profile = () => {
    const [company_type_index, $company_type_index] = useState(0);
    const [company_name, $company_name] = useState("");
    const [national_id, $national_id] = useState(null);
    const [registeration_no, $registeration_no] = useState("");
    const [phone_number, $phone_number] = useState("");
    const [fax, $fax] = useState("");
    const [web_address, $web_address] = useState("");
    const [location, $location] = useState("");
    const [ceo_fullname, $ceo_fullname] = useState(null);
    const [agent_fullname, $agent_fullname] = useState("");
    const [agent_contact, $agent_contact] = useState("");

    const [btnSubmitHovered, $btnSubmitHovered] = useState(false);

    const onFormSubmit = async (event) => {
        try {
            event.preventDefault();

            const profile = {
                company_type: CompanyTypes[company_type_index],
                company_name,
                national_id: +national_id,
                registeration_no: +registeration_no,
                phone_number,
                fax,
                web_address: new Date(web_address),
                ceo_fullname,
                location,
                agent_fullname,
                agent_contact,
            };

            const { status, data } = await services.saveProfile(profile);

            if (status === Responses.CreatedSuccessfully) {
                SuccessToast("ثبت نام با موفقیت انجام شد");
                console.log(data);
            }
        } catch (err) {
            if (!Responses.isErrorExpected(err)) {
                FailureToast(
                    "ثبت نام با مشکل رو به رو شد. لطفا دوباره تلاش کتنید"
                );
            }
            else if(Responses.NotFound === err.response.status) {
                FailureToast("سرور شناسایی نشد! لطفا ارتباط خود به اینترنت را بررسی نمایید.")
            }
        }
    };
    return (
        <form onSubmit={(event) => onFormSubmit(event)}>
            <div className="row mb-3 mx-3 p-3 company-type">
                <span
                    onClick={() => $company_type_index(0)}
                    className={`col p-2 ${
                        !company_type_index ? "company-type-select" : ""
                    }`}
                >
                    {CompanyTypes[0]}
                </span>
                <span
                    onClick={() => $company_type_index(1)}
                    className={`col p-2 ${
                        company_type_index ? "company-type-select" : ""
                    }`}
                >
                    {CompanyTypes[1]}
                </span>
            </div>
            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="نام شرکت"
                    value={company_name}
                    required="required"
                    onChange={(e) => $company_name(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="شماره ملی شرکت"
                    value={national_id}
                    required="required"
                    onChange={(e) => $national_id(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="شماره ثبت شرکت"
                    value={registeration_no}
                    autoComplete="username"
                    required="required"
                    onChange={(e) => $registeration_no(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="txt"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="شماره تماس"
                    value={phone_number}
                    required="required"
                    onChange={(e) => $phone_number(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="شماره فکس"
                    value={fax}
                    required="required"
                    onChange={(e) => $fax(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="آدرس اینترنتی"
                    value={web_address}
                    required="required"
                    onChange={(e) => $web_address(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="آدرس"
                    value={location}
                    required="required"
                    onChange={(e) => $location(e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="نام و نام خانوادگی مدیرعامل"
                    value={ceo_fullname}
                    required="required"
                    onChange={(e) => $ceo_fullname(e.target.value)}
                />
            </div>
            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="نام و نام خانوادگی نماینده"
                    value={agent_fullname}
                    required="required"
                    onChange={(e) => $agent_fullname(e.target.value)}
                />
            </div>
            <div className="row mb-3">
                <input
                    type="text"
                    className="order-textbox py-2 enlarging-textbox text-center"
                    placeholder="شماره تماس نماینده"
                    value={agent_contact}
                    required="required"
                    onChange={(e) => $agent_contact(e.target.value)}
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

export default Profile;
