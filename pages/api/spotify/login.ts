// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateRandomString, setCookie } from '../../../src/core/utilities'
const querystring = require('querystring');

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const state = generateRandomString(16)

	setCookie(res, 'spotify_auth_state', state)

	res.redirect(307, 'https://accounts.spotify.com/authorize?' + querystring.stringify({
		response_type: 'code',
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: 'playlist-modify-private user-read-private playlist-read-private playlist-modify-public',
		redirect_uri: process.env.SPOTIFY_CALLBACK,
		state: state
	}))
}
