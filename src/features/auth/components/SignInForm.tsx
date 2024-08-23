import { ClientSafeProvider, signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  SpaceBetween,
  Button,
  Container,
  Header,
  FormField,
  Input,
} from "@cloudscape-design/components";

type FData = {
  email: string;
  password: string;

  // hidden area
  providerId: string;
  callbackUrl: string;
};

type SignInFormProps<Data = FData> = {
  credentialProvider: ClientSafeProvider | null;
  emailProvider: ClientSafeProvider | null;
  idpProviders: Array<ClientSafeProvider>;
  initialValue?: Data;
  error?: string;
};

export const SignInForm = ({
  credentialProvider,
  idpProviders,
  initialValue,
  error,
}: SignInFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
  });

  const onSubmit = (values: FData) => {
    signIn(values.providerId, {
      ...values,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form
        errorText={error}
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="primary">ログイン</Button>
          </SpaceBetween>
        }
      >
        <Container header={<Header variant="h2">ログイン</Header>}>
          {idpProviders.length > 1 ? (
            <>
              <SpaceBetween direction="vertical" size="s">
                {idpProviders.map((provider) => (
                  <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                      Sign in with {provider.name}
                    </button>
                    <div>{provider.type}</div>
                  </div>
                ))}
              </SpaceBetween>

              <hr />
            </>
          ) : null}

          {credentialProvider ? (
            <SpaceBetween direction="vertical" size="s">
              <Controller
                name="providerId"
                control={control}
                render={({ field: { value } }) => (
                  <input value={value} style={{ display: "none" }} />
                )}
              />

              <Controller
                name="callbackUrl"
                control={control}
                render={({ field: { value } }) => (
                  <input value={value} style={{ display: "none" }} />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormField label="メールアドレス" errorText={error?.message}>
                    <Input
                      autoFocus
                      type="email"
                      value={value}
                      onChange={({ detail }) => onChange(detail.value)}
                    />
                  </FormField>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormField label="パスワード" errorText={error?.message}>
                    <Input
                      type="password"
                      value={value}
                      onChange={({ detail }) => onChange(detail.value)}
                    />
                  </FormField>
                )}
              />
            </SpaceBetween>
          ) : null}
        </Container>
      </Form>
    </form>
  );
};
