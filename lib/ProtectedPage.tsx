import UnAuthorizedModal from "@/components/UnAuthorizedModal";
import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Center, Spinner } from "@chakra-ui/react";

function ProtectedPage({ children }: { children: React.ReactNode }) {
  const session = useSession();
  console.log(
    "🚀 ~ file: ProtectedPage.tsx:9 ~ ProtectedPage ~ session:",
    session
  );
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      console.log("unauthenticated");
      router.push("/account/unauthorized");
    }
  }, [session.status]);

  if (session.status === "authenticated") {
    return <>{children}</>;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-24 bg-gray-100">
        <Center>
          <Spinner />
        </Center>
      </div>
    </>
  );
}

export default ProtectedPage;
