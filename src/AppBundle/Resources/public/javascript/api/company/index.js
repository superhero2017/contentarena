import React from "react";
import Fetch from "../Fetch";
import {contentParserFromServer} from "../../common/utils/listing";
import {API_URLS} from "../../common/constants";

export const InviteUsersRequest = async ( common, users ) => {

    const res = await fetch(common.envHostUrl + API_URLS.INVITE_USERS,{
        method: 'POST',
        body: JSON.stringify({users: users}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) throw Error(res.statusText);

    return await res.json();

};