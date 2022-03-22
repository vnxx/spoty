// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiFetch } from '../../../../src/core/utilities';

const querystring = require('querystring');

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case 'DELETE':
			apiFetch(req, `/playlists/${req.query.id}/tracks`, {
				method: 'DELETE', body: {
					tracks: [{
						uri: req.query.trackURI
					}]
				}
			}).then(data => {
				res.status(data.error ? data.error.status : 200).json({
					status: data.error ? data.error.status : 200,
					...data
				})
			})
			break

		default:
			apiFetch(req, `/playlists/${req.query.id}`).then(data => {
				res.status(data.error ? data.error.status : 200).json(data)
			}).catch(error => {
				res.status(500).json(error)
			})
			break;
	}

}
