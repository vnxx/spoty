import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
const querystring = require('querystring');

export function generateRandomString(length: number): string {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export const setCookie = (
	res: NextApiResponse,
	name: string,
	value: unknown,
) => {
	const stringValue =
		typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

	res.setHeader('Set-Cookie', serialize(name, stringValue, {}))
}

export const apiFetch = async (req: NextApiRequest, url: string, etc?: { method?: 'GET' | 'DELETE' | 'POST', body?: any }) => {
	return await getAccessToken(req).then(pre => {
		return fetch(process.env.SPOTIFY_URL + url, {
			headers: {
				'Authorization': `Bearer ${pre.access_token}`,
				'Content-Type': 'application/json'
			},
			method: etc && etc.method ? etc.method : 'GET',
			body: etc && etc.body ? JSON.stringify(etc.body) : null
		}).then(response => response.json());
	})

}

export const getAccessToken = async (req: NextApiRequest) => {
	const refresh_token = req.cookies['refresh_token']
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	});

	return response.json();
};

export const fetcher = (url: string) => fetch(url).then(async (res) => {

	if (!res.ok) {
		const error: any = new Error('An error occurred while fetching the data.')
		// Attach extra info to the error object.
		error.info = await res.json()
		error.status = res.status

		throw error
	}

	return res.json()
});