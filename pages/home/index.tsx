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
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { groupTerritories } from "../../lib/groupTerritories";
import useSWRImmutable from "swr/immutable";

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

const fetcher = async (url: string) => {
  const req = await axios.get(url);
  return req.data;
};

function Page() {
  const { data, error, isLoading } = useSWRImmutable(
    "/api/getAllTerritories",
    fetcher
  );

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-24">
        <Center>
          <Flex flexDirection={"column"} gap={"10"} alignItems={"center"}>
            <Heading>Luzon Territories: {data?.data?.length}</Heading>
            <Text>Here are the list of territories </Text>
            {isLoading && <Spinner />}
            {error && <div>Error fetching data</div>}
            {!isLoading && !error && data && (
              <Accordion defaultIndex={[0]} allowMultiple>
                {groupTerritories(data.data).map((groupedRegion) => (
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
            )}
          </Flex>
        </Center>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      {/* <ProtectedPage> */}
      <Page />
      {/* </ProtectedPage> */}
    </>
  );
}
