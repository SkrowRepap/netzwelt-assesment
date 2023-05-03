// create a middleware function that will be called before every API route and set Access-Control-Allow-Origin header to *.
//
// Path: pages\api\middleware.ts
import { NextApiResponse, NextApiRequest } from "next";

export default function middleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
}
