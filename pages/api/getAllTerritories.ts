// create a nextjs api that returns the response on this url: https://netzwelt-devtest.azurewebsites.net/Territories/All

// Path: pages\api\getAllTerritories.ts
import { NextApiRequest, NextApiResponse } from "next";
import { axiosNetzwelt } from "./apiConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await axiosNetzwelt.get("/Territories/All");
  res.status(200).json(data);
}
