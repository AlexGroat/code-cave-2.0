import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/queries";
import "./index.css";
import { POST_MESSAGE } from "../../utils/mutations";