import axios from "axios";
import Responses from "./responses";
import { FailureToast } from "./notification";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("TOKEN");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        else config.headers.Authorization = null;
        return config;
    },
    (error) => {
        // what to do?
        return Promise.reject(error);
    }
);


axios.interceptors.response.use(null, (error) => {
    try {
        if (error.response.status === Responses.BadRequest) {
            FailureToast(
                "مشکلی در ارسال درخواست شما به سرور وجود داشت، لطفا دوباره تلاش کنید"
            );
        } else if (error.response.status === Responses.Unauthorized) {
            // is this needed? localStorage.setItem("TOKEN", null);
            FailureToast(
                "احراز هویت موفقیت آمیز نبود. لطفا وارد حساب کاربری خود شوید"
            );
            localStorage.setItem("TOKEN", null);
        } else if (error.response.status === Responses.Forbidden) {
            FailureToast("شماره دانشجویی یا رمز عبور نادرست است");
        } else if (error.response.status === Responses.NotAcceptable) {
            //or used Locked: 423
            FailureToast("این قسمت فقط مختص کاربران ادمین می باشد");
        } else if (error.response.status === Responses.Conflict) {
            FailureToast(
                "کاربری با این شماره دانشجویی یا ایمیل قبلا ثبت نام کرده است"
            );
        } else if (error.response.status === Responses.SessionExpired) {
            FailureToast("نشست شما منقضی شده است، لطفا دوباره وارد حساب خود شوید.");
            localStorage.setItem("TOKEN", null);
            //redirect to sign in page !
        } else if (error.response.status === Responses.UnprocessableEntity) {
            FailureToast("ورودی شما با استانداردهای سایت مطابقت ندارد");
        } else if (error.response.status === Responses.InternalServerError) {
            FailureToast(
                "مشکلی از سمت سرور پیش آمده است ... لطفا لحظاتی بعد دوباره تلاش کنید"
            );
        } else if (!Responses.isErrorExpected(error)) {
            FailureToast(
                "خطای غیرمنتظره ای رخ داده است. اگر برای چندمین بار است که این پیغلم را می بینید، لطفا مشکل خود را باه ما اطلاع دهید."
            );
        }
    } catch (err) {
        console.log(error);
    }
    return Promise.reject(error);
});

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default http;
