import UnAuthorizedModal from "@/components/UnAuthorizedModal";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {};

function UnauthorizedPage({}: Props) {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.back();
    return (
      <>
        <div className="min-h-screen flex items-center justify-center p-24">
          You are already logged in. Redirecting...
        </div>
      </>
    );
  }

  if (session.status === "unauthenticated") {
    return (
      <>
        <UnAuthorizedModal />
      </>
    );
  }
}

export default UnauthorizedPage;
