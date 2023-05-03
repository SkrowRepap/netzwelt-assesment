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
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const router = useRouter();
  const toast = useToast();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.error) {
      toast({
        title: "Error",
        description: res.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    if (res?.ok) {
      toast({
        title: "Success",
        description: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/home");
    }
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
                <FormControl
                  isRequired
                  isInvalid={errors.username ? true : false}
                >
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

                <FormControl
                  isRequired
                  isInvalid={errors.password ? true : false}
                  mt={6}
                >
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
