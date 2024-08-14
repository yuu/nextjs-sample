import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  SpaceBetween,
  Button,
  Container,
  Header,
  FormField,
  Input,
} from "@cloudscape-design/components";
import { TestCreateInputSchema } from "@/schema";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

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
  const { control, handleSubmit, setError } = useForm<Prisma.TestCreateInput>({
    resolver: zodResolver(TestCreateInputSchema),
    defaultValues: initialValue,
  });

  if (errors) {
    (Object.keys(errors) as Array<FormItemNames>).forEach((key) => {
      errors[key].forEach((error) =>
        setError(key, { message: `i18n by ${error}` }),
      );
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" href="/tests">
              キャンセル
            </Button>
            <Button variant="primary" loading={isLoading}>
              登録
            </Button>
          </SpaceBetween>
        }
        header={<Header variant="h1">テスト登録</Header>}
      >
        <Container header={<Header variant="h2">テストフォーム</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <Controller
              name="familyName"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="氏" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="名" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="TEL" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="メールアドレス" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="郵便番号" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="都道府県" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="市町村" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="市町村以降" errorText={error?.message}>
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
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField label="ビルや建物名" errorText={error?.message}>
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
