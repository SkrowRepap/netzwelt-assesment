// create a nextjs api that returns the response on this url: https://netzwelt-devtest.azurewebsites.net/Territories/All

// Path: pages\api\getAllTerritories.ts
import { NextApiRequest, NextApiResponse } from "next";
import { axiosNetzwelt } from "./apiConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { data } = await axiosNetzwelt.post("/Account/SignIn", {
        username: req.body.username,
        password: req.body.password,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
