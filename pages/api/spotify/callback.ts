// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../../src/core/utilities';


const querystring = require('querystring');

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = req.query;

	var code = query.code || null;
	var state = query.state || null;
	var storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

	// res.status(200).json(query)

	if (state === null || state !== storedState) {
		res.redirect(307, '/login' +
			querystring.stringify({
				error: 'state_mismatch'
			}));
	} else {
		fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: querystring.stringify({
				code: code,
				redirect_uri: process.env.SPOTIFY_CALLBACK,
				grant_type: 'authorization_code'
			})
		}).then(response => response.json()).then(data => {
			setCookie(res, 'refresh_token', data.refresh_token)

			res.redirect(307, '/').end(res.getHeader('Set-Cookie'))

		}).catch(error => {
			res.status(500).json(error)
		})

	}
}