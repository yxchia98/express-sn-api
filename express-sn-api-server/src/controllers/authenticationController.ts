import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Request, Response } from "express";

interface ValidateUserSNAPIResponse {
    result: SysIdObject[];
}
interface SysIdObject {
    sys_id: string;
}
interface ValidateUserAPIResponse {
    error: boolean;
    message: string;
    data: string;
}
const validateUser = async (req: Request, res: Response) => {
    // check for mandatory fields
    let output: ValidateUserAPIResponse = {
        error: true,
        message: "Missing mandatory fields",
        data: "",
    };
    if (!req.body.email) {
        res.status(400).send(output);
        return;
    }
    const userEmail: string = <string>req.body.email;
    // POST using basic auth
    // const validateUserConfig: AxiosRequestConfig = {
    //     method: "get",
    //     url: `${process.env.SN_INSTANCE_URL}api/now/table/sys_user?sysparm_query=email%3D${userEmail}&sysparm_fields=sys_id&sysparm_limit=1`,
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization:
    //             "Basic " +
    //             Buffer.from(
    //                 `${process.env.SERVICE_ACCOUNT_USER}:${process.env.SERVICE_ACCOUNT_PASSWORD}`
    //             ).toString("base64"),
    //     },
    // };

    // get using access token and OAuth2.0
    const validateUserConfig: AxiosRequestConfig = {
        method: "get",
        url: `${process.env.SN_INSTANCE_URL}api/now/table/sys_user?sysparm_query=email%3D${userEmail}&sysparm_fields=sys_id&sysparm_limit=1`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OAUTH_ACCESS_TOKEN}`,
        },
    };
    const validateUserResponse: AxiosResponse<ValidateUserSNAPIResponse> = await axios(
        validateUserConfig
    );
    if (validateUserResponse.data.result.length > 0) {
        output.error = false;
        output.message = `successfully retrieved sys_id for ${userEmail}`;
        output.data = validateUserResponse.data.result[0].sys_id;
        res.status(200).send(output);
        return;
    } else {
        output.message = `user with ${userEmail} not found!`;
        res.status(404).send(output);
        return;
    }
};

export default module.exports = {
    validateUser,
};
