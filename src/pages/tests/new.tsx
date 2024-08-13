import type { NextPage } from "next";
import { UserForm } from "@/features/test";
import { trpc } from "@/api";

const TestsNewPage: NextPage = () => {
  const mutate = trpc.test.create.useMutation();

  const onSubmit = async (values: any) => {
    const result = await mutate.mutate(values);

    return Promise.resolve();
  };

  return <UserForm onSubmit={onSubmit} />;
};

export default TestsNewPage;
