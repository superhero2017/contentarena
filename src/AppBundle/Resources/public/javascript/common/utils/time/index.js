import { SERVER_DATE_TIME_FORMAT } from "../../constants";

export const formatMomentToServerFormat = m => m.format(SERVER_DATE_TIME_FORMAT);
