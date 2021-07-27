import { transformData } from "../Config/dataFormat";
import { get, post, del } from "../API/getMethod";
import { RESOURCES, HTTP_STATUS } from "../Config/constants";

const getEvents = async () => {
  const apiData = await get(RESOURCES.EVENTS);
  const appData = apiData.map(e => transformData(e));

  return appData;
}

const getEvent = async (eventId)  => {
  const apiData = await get(`${RESOURCES.EVENTS}/${eventId}`)
  const appData = transformData(apiData)

  return appData
}

const joinEvent = async (eventId) => {
	const response = await post(`${RESOURCES.EVENTS}/${eventId}/${RESOURCES.ATTEND_EVENT}`)

	if (response && response.status === HTTP_STATUS.OK) {
		const appData = await response.json()

		return transformData(appData)
	}
}

const leaveEvent = async (eventId) => {
	const response = await del(`${RESOURCES.EVENTS}/${eventId}/${RESOURCES.ATTEND_EVENT}`)

	if (response && response.status === HTTP_STATUS.OK) {
		const appData = await response.json()

		return transformData(appData)
	}
}

const createEvent = async (data) => {
	const response = await post(`${RESOURCES.EVENTS}`, { ...data })

	if (response && response.status === HTTP_STATUS.CREATED) {
		const appData = await response.json()

		return transformData(appData)
	} else {
		return {}
	}
}

export { getEvents, getEvent, joinEvent, leaveEvent, createEvent };
