import * as api from "../api/index.js";

export const getPublishedEvents = async () => {
    const {data} = await api.publishedEvents();
    const res = data.data.events;
    return res;
}