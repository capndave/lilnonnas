import config from '../config.js'

const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

export default async function getMenu() {
	try {
		await new Promise((resolve, reject) => {
			gapi.load('client', resolve);
		})
		await initializeClient()
		return await getData()
	} catch {
		console.error('Error getting menu', e)
	}
}

async function getData() {
	const response = await gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: config.GOOGLE_SHEET_ID,
		range: 'A2:D100'
	})
	return response.result.values
}

async function initializeClient() {
	return await gapi.client.init({
		apiKey: config.GOOGLE_API_KEY,
		discoveryDocs: DISCOVERY_DOCS,
	})
}