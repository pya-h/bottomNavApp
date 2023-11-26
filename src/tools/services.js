import http from "./http";

const services = {
	submitOrder: (order) =>
		http.post(
			`/order`,
			JSON.stringify(order)
		),
	saveProfile: (profile) =>
		http.post(
			`edit`,
			JSON.stringify(profile)
		),
};

export default services;