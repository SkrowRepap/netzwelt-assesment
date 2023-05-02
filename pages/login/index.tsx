import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

function index({}: Props) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-24">
        <Center>
          <Card align="center" size={"lg"} w={"sm"}>
            <CardHeader>
              <Heading size="lg"> Login</Heading>
            </CardHeader>
            <CardBody w="full">
              <form>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" placeholder="Username" />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Username" />
                </FormControl>
              </form>
            </CardBody>
            <CardFooter w="full">
              <Button colorScheme="blue" alignSelf={"end"}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </Center>
      </div>
    </>
  );
}

export default index;
