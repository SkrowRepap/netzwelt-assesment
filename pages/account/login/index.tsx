import { axiosNetzwelt } from "@/pages/api/apiConfig";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const req = await axiosNetzwelt.post("/Account/SignIn", data);
    console.log(req.data);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-24 bg-gray-100">
        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card align="center" size={"lg"} w={"sm"}>
              <CardHeader>
                <Heading size="lg"> Login</Heading>
              </CardHeader>
              <CardBody w="full">
                <FormControl isRequired isInvalid={errors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: true,
                      minLength: {
                        value: 2,
                        message: "Min length is 2",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={errors.password} mt={6}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Username"
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 2,
                        message: "Min length is 2",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </CardBody>
              <CardFooter w="full">
                <Button
                  variant={"outline"}
                  colorScheme="blue"
                  type="submit"
                  w="full"
                  isLoading={isSubmitting}
                  loadingText="Logging you in..."
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Center>
      </div>
    </>
  );
}

export default LoginPage;
