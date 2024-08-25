import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { fromSafePromise, errAsync, okAsync } from "neverthrow";
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
  const session = await options()
    .map((authOption) => getServerSession(context.req, context.res, authOption))
    .match(
      (session) => (session ? true : false),
      () => false
    );
  if (session) {
    return {
      redirect: { destination: "/" },
      props: {
        credentialProvider: null,
        emailProvider: null,
        idpProviders: [],
      } satisfies PageProps,
    };
  }

  return await fromSafePromise(getProviders())
    .andThen((providers) => {
      // TODO: internal server error
      if (providers === null) {
        return errAsync({
          redirect: { destination: "/" },
          props: {
            credentialProvider: null,
            emailProvider: null,
            idpProviders: [],
          },
        });
      }

      return okAsync(providers);
    })
    .map((providers) => ({
      props: {
        credentialProvider:
          Object.values(providers)
            .filter((p) => p.type === "credentials")
            ?.shift() ?? null,
        emailProvider:
          Object.values(providers)
            .filter((p) => p.type === "email")
            ?.shift() ?? null,
        idpProviders: Object.values(providers).filter(
          (p) => p.type === "oauth"
        ),
      },
    }))
    .match(
      (r) => r,
      (e) => e
    );
};

SignInPage.authGuard = false;
SignInPage.guestGuard = true;
SignInPage.getLayout = (page) => page;

export default SignInPage;
