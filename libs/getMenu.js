import config from '../config.js'

const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

export default async function getMenu() {
	try {
		await gapi.load('client', initializeClient)
	} catch {
		console.error('Error initializing', e)
	}

}


async function initializeClient() {
	try {
		await gapi.client.init({
			apiKey: config.GOOGLE_API_KEY,
			discoveryDocs: DISCOVERY_DOCS,
		})

		const response = await gapi.client.sheets.spreadsheets.values.get({
			spreadsheetId: config.GOOGLE_SHEET_ID,
			range: 'A1:D20'
		})

		return response.result.values

	} catch (e) {
		console.error('Error getting menu', e)
	}
}