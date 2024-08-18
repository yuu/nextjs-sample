import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { getProviders, ClientSafeProvider } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "@/config/auth";
import { SignInForm } from "@/features/auth";

type PageProps = {
  credentialProvider?: ClientSafeProvider;
  idpProviders: Array<ClientSafeProvider>;
};

const SignInPage: NextPage<PageProps> = ({
  credentialProvider,
  idpProviders,
}) => {
  const {
    query: { error },
  } = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <SignInForm
      credentialProvider={credentialProvider}
      idpProviders={idpProviders}
      initialValue={{
        email: "",
        password: "",
        callbackUrl,
        providerId: credentialProvider?.id ?? "0xdeadbeef",
      }}
      error={error ? String(error) : undefined}
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const authOptions = await options();
  if (authOptions.isErr()) {
    // TODO: internal server error
    return {
      redirect: { destination: "/" },
      props: { idpProviders: [] },
    };
  }

  const session = await getServerSession(
    context.req,
    context.res,
    authOptions.unwrapOr({})
  );

  if (session) {
    return {
      redirect: { destination: "/" },
      props: { idpProviders: [] },
    };
  }

  const providers = await getProviders();
  if (providers === null) {
    // TODO: internal server error
    return {
      redirect: { destination: "/" },
      props: { idpProviders: [] },
    };
  }

  const credentialProvider = Object.values(providers).filter(
    (p) => p.type === "credentials"
  )[0];
  const idpProviders = Object.values(providers).filter(
    (p) => p.type === "oauth"
  );

  return {
    props: {
      credentialProvider,
      idpProviders,
    },
  };
};

SignInPage.authGuard = false;
SignInPage.guestGuard = true;
SignInPage.getLayout = (page) => page;

export default SignInPage;
