import { toast } from "react-toastify";
import React from "react";

export const FailureToast = (text) => {
	toast.error(text, {
		// theme: "light",
		position: "top-right",
		closeOnClick: true,
		icon: (
			<i
				style={{ float: "right" }}
				className="fa fa-times"
				aria-hidden="true"></i>
		),
	});
};

export const SuccessToast = (text) => {
	toast.success(text, {
		// theme: "light",
		position: "top-left",
		closeOnClick: true,
		icon: (
			<i
				style={{ float: "right" }}
				className="fa fa-check"
				aria-hidden="true"></i>
		),
	});
};