import { useIntl, FormattedMessage } from "react-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  SpaceBetween,
  Button,
  Container,
  Header,
  FormField,
  Input,
} from "@cloudscape-design/components";
import type { Prisma } from "@prisma/client";
import { makeZodErrorMap } from "@/lib/zod";
import { TestCreateInputSchema } from "@/schema";
import { i18n } from "@/features/test/locales";

type FormItemNames = keyof z.infer<typeof TestCreateInputSchema>;

type UserFormProps<Data = any> = {
  onSubmit: (valeus: Data) => PromiseLike<void>;
  initialValue?: Data;
  isLoading?: boolean;
  errors?: Record<string, Array<string>>;
};

export const UserForm = ({
  onSubmit,
  initialValue,
  isLoading,
  errors,
}: UserFormProps) => {
  const intl = useIntl();
  const { control, handleSubmit, setError } = useForm<Prisma.TestCreateInput>({
    resolver: zodResolver(TestCreateInputSchema, {
      errorMap: makeZodErrorMap(intl),
    }),
    defaultValues: initialValue,
  });

  if (errors) {
    (Object.keys(errors) as Array<FormItemNames>).forEach((key) => {
      errors[key].forEach((error) =>
        setError(key, { message: `i18n by ${error}` })
      );
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" href="/tests">
              <FormattedMessage
                id="defaults.helpers.links.cancel"
                defaultMessage="キャンセル"
              />
            </Button>
            <Button variant="primary" loading={isLoading}>
              <FormattedMessage
                id="defaults.helpers.submit.create"
                defaultMessage="登録する"
              />
            </Button>
          </SpaceBetween>
        }
        header={
          <Header variant="h1">
            <FormattedMessage
              id="features.test.components.UserForm.form_header"
              defaultMessage="テスト登録"
            />
          </Header>
        }
      >
        <Container
          header={
            <Header variant="h2">
              <FormattedMessage
                id="features.test.components.UserForm.container_header"
                defaultMessage="テストフォーム"
              />
            </Header>
          }
        >
          <SpaceBetween direction="vertical" size="l">
            <Controller
              name="familyName"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    autoFocus
                    value={value}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="firstName"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    autoFocus
                    value={value}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="tel"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    autoFocus
                    value={value ?? ""}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    placeholder="test@example.com"
                    autoFocus
                    inputMode="email"
                    value={value}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="postalCode"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    autoFocus
                    value={value ?? ""}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="prefecture"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    value={value}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    value={value}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="streetAddress"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    value={value}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />

            <Controller
              name="building"
              control={control}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <FormField
                  label={intl.formatMessage(i18n.UserForm[name].label)}
                  errorText={error?.message}
                >
                  <Input
                    value={value}
                    onChange={({ detail }) => onChange(detail.value)}
                  />
                </FormField>
              )}
            />
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
};
