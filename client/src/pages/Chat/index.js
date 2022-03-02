import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/queries";
import { POST_MESSAGE } from "../../utils/mutations";
import Sidebar from "../../components/Sidebar";

export default function Chat() {
    return (
       <Sidebar />
    )
}