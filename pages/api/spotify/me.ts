// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiFetch } from '../../../src/core/utilities'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	apiFetch(req, '/me').then(data => {
		res.status(data.error ? data.error.status : 200).json(data)

	}).catch(error => {
		res.status(500).json(error)
	})
}
