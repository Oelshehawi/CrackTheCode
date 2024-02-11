import { NextApiRequest, NextApiResponse } from 'next';
import * as Ably from 'ably/promises';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.ABLY_API_KEY) {
    return res.status(500).json({
      errorMessage: `Missing ABLY_API_KEY environment variable.
        If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key.
        If you're running in Deployment server, make sure you've configured env variable ABLY_API_KEY. `,
    });
  }
  try {
    const clientId =
      req.body.clientId || process.env.DEFAULT_CLIENT_ID || 'NO_CLIENT_ID';

    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: clientId,
    });
    res.status(200).json(tokenRequestData);
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: 'Failed to fetch token request data',
        details: error.message,
      });
  }
}
