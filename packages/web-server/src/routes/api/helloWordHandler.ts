import { Request, Response } from 'express';

async function helloWorldHandler(
  request: Request,
  response: Response
): Promise<void> {
  response.status(200).json({
    headers: request.headers,
    userIP: request.ip,
    timestamp: new Date().toISOString()
  });
}

export default helloWorldHandler;
