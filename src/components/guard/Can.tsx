import { createContextualCan } from "@casl/react";
import { AclContextConsumer } from "@/context";

export const Can = createContextualCan(AclContextConsumer);
