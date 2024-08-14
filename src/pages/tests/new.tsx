import type { NextPage } from "next";
import { UserForm } from "@/features/test";
import { trpc, getDetails } from "@/api";

const TestsNewPage: NextPage = () => {
  const mutate = trpc.test.create.useMutation();

  const onSubmit = async (values: any) => {
    try {
      const newRecord = await mutate.mutateAsync(values);
      console.log(newRecord);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <UserForm
      onSubmit={onSubmit}
      isLoading={mutate.isLoading}
      errors={mutate.isError ? getDetails(mutate.error?.data) : undefined}
    />
  );
};

export default TestsNewPage;
