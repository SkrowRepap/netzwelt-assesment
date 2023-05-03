import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { groupTerritories } from "../../lib/groupTerritories";
import useSWRImmutable from "swr/immutable";
import ProtectedPage from "@/lib/ProtectedPage";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

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

  const toast = useToast();

  const router = useRouter();

  const logout = () => {
    toast({
      title: "You have been logged out",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    signOut({
      redirect: false,
    });

    router.push("/account/login");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-24">
        <div className="absolute top-0 right-0 p-24">
          <Button variant={"outline"} colorScheme="red" onClick={logout}>
            Logout
          </Button>
        </div>
        <Center>
          <Flex flexDirection={"column"} gap={"10"} alignItems={"center"}>
            <Heading>Luzon Territories: {data?.data?.length}</Heading>
            <Text>Here are the list of territories </Text>
            {isLoading && <Spinner />}
            {error && <div>Error fetching data</div>}
            {!isLoading && !error && data && (
              <Accordion defaultIndex={[0]} allowMultiple>
                {groupTerritories(data.data).map((groupedRegion) => (
                  <AccordionItem key={groupedRegion.id} mt={"4"}>
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
      <ProtectedPage>
        <Page />
      </ProtectedPage>
    </>
  );
}
