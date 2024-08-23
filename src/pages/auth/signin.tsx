import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { getProviders, ClientSafeProvider } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "@/config/auth";
import { SignInForm } from "@/features/auth";

type PageProps = {
  credentialProvider: ClientSafeProvider | null;
  emailProvider: ClientSafeProvider | null;
  idpProviders: Array<ClientSafeProvider>;
};

const SignInPage: NextPage<PageProps> = ({
  credentialProvider,
  emailProvider,
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
      emailProvider={emailProvider}
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
      props: {
        credentialProvider: null,
        emailProvider: null,
        idpProviders: [],
      },
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
      props: {
        credentialProvider: null,
        emailProvider: null,
        idpProviders: [],
      },
    };
  }

  const providers = await getProviders();
  if (providers === null) {
    // TODO: internal server error
    return {
      redirect: { destination: "/" },
      props: {
        credentialProvider: null,
        emailProvider: null,
        idpProviders: [],
      },
    };
  }

  const credentialProvider =
    Object.values(providers)
      .filter((p) => p.type === "credentials")
      ?.shift() ?? null;
  const emailProvider =
    Object.values(providers)
      .filter((p) => p.type === "email")
      ?.shift() ?? null;
  const idpProviders = Object.values(providers).filter(
    (p) => p.type === "oauth"
  );

  return {
    props: {
      credentialProvider,
      emailProvider,
      idpProviders,
    },
  };
};

SignInPage.authGuard = false;
SignInPage.guestGuard = true;
SignInPage.getLayout = (page) => page;

export default SignInPage;
