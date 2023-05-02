import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { axiosNetzwelt } from "../api/apiConfig";
import { data } from "@/territories";

type Territory = {
  id: string;
  name: string;
  parent: string | null;
};

type SubTerritory = {
  id: string;
  name: string;
  territory: Territory[];
};

type GroupTerritory = {
  id: string;
  parent: string | null;
  name: string;
  subTerritory: {
    name: string;
    id: string;
    subTerritory: SubTerritory[];
  }[];
};

const Parent = ({ name }: { name: string }) => {
  return (
    <>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
    </>
  );
};

const getAllTerritoriesURL = "/Territories/All";

const fetcher = async (url: string) => {
  const req = await axiosNetzwelt.get(url);
  return req.data;
};

function HomePage() {
  const getParents = new Set(data.data.map((region) => region.parent));
  const groupedRegions: GroupTerritory[] = [];

  for (const region of data.data) {
    if (region.parent === null) {
      groupedRegions.push({
        parent: region.parent,
        subTerritory: [],
        name: region.name,
        id: region.id,
      });
    } else {
      const parentIndex = groupedRegions.findIndex(
        (groupedRegion) => groupedRegion.id === region.parent
      );
      if (parentIndex !== -1) {
        groupedRegions[parentIndex].subTerritory.push({
          name: region.name,
          id: region.id,
          subTerritory: [],
        });
      } else {
        const subTerritoryIndex = groupedRegions.map((groupedRegion) =>
          groupedRegion.subTerritory.findIndex(
            (subTerritory) => subTerritory.id === region.parent
          )
        );
        const subTerritoryParentIndex = subTerritoryIndex.findIndex(
          (index) => index !== -1
        );
        if (subTerritoryParentIndex !== -1) {
          groupedRegions[subTerritoryParentIndex].subTerritory[
            subTerritoryIndex[subTerritoryParentIndex]
          ].subTerritory.push({
            id: region.id,
            name: region.name,
            territory: [],
          });
        }
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-24">
        <Center>
          <Flex flexDirection={"column"} gap={"10"} alignItems={"center"}>
            <Heading>Luzon Territories: {data.data.length}</Heading>
            <Text>Here are the list of territories </Text>
            <Accordion defaultIndex={[0]} allowMultiple>
              {groupedRegions.map((groupedRegion) => (
                <AccordionItem key={groupedRegion.id}>
                  <Parent name={groupedRegion.name} />
                  <AccordionPanel pb={4}>
                    {groupedRegion.subTerritory.map((subTerritory) => {
                      if (subTerritory.subTerritory.length === 0) {
                        return (
                          <UnorderedList key={subTerritory.id}>
                            <ListItem>{subTerritory.name}</ListItem>
                          </UnorderedList>
                        );
                      } else {
                        const subTerritoryParent =
                          subTerritory.subTerritory.map((subTerritory) => {
                            return (
                              <UnorderedList key={subTerritory.id}>
                                <ListItem>{subTerritory.name}</ListItem>
                              </UnorderedList>
                            );
                          });
                        return (
                          <AccordionItem key={subTerritory.id}>
                            <Parent name={subTerritory.name} />
                            <AccordionPanel pb={4}>
                              {subTerritoryParent}
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      }
                    })}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Flex>
        </Center>
      </div>
    </>
  );
}

export default HomePage;
