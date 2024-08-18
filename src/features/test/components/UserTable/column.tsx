import { FormattedMessage, FormattedTime } from "react-intl";
import { match, P } from "ts-pattern";
import Link from "next/link";
import {
  type TableProps,
  Button,
  Popover,
} from "@cloudscape-design/components";
import { createLabelFunction } from "@/lib/cloudscape";
import { ascCompare } from "@/lib/utils";
import { type Test } from "@/model/test";

type ColumnDisplays = Array<{ id: string; visible: boolean }>;

const TEL_REGEX = /^(\d{3})(\d{4})(\d{4})$/;
const TEL_REGEX1 = /^(\d{4})(\d{2})(\d{4})$/;

const isDate = (value: unknown): value is Date => value instanceof Date;

export const columnDefinitions: TableProps<Test>["columnDefinitions"] = [
  {
    id: "id",
    header: (
      <FormattedMessage
        id="features.test.components.UserTable.column.id"
        defaultMessage="ID"
      />
    ),
    cell: (item) => item.id,
  },
  {
    id: "name",
    header: (
      <FormattedMessage
        id="features.test.components.UserTable.column.name"
        defaultMessage="氏名"
      />
    ),
    width: 160,
    cell: (item) => (
      <Link href={`/tests/${item.id}`}>
        {item.familyName + " " + item.firstName}
      </Link>
    ),
    sortingField: "familyName",
    ariaLabel: createLabelFunction("familyName"),
    sortingComparator(a, b) {
      return a.familyName.localeCompare(b.familyName);
    },
  },
  {
    id: "tel",
    header: (
      <FormattedMessage
        id="features.test.components.UserTable.column.tel"
        defaultMessage="TEL"
      />
    ),
    width: 160,
    cell: (item) =>
      match(item.tel)
        .with(P.string.regex(TEL_REGEX), (v) => {
          const match = v.match(TEL_REGEX)!;
          const text = `☎ ${match[1]}-${match[2]}-${match[3]}`;
          const content = <a href={`tel:${v}`}>{text}</a>;

          return (
            <Popover content={content}>
              <Button variant="inline-link">{text}</Button>
            </Popover>
          );
        })
        .with(P.string.regex(TEL_REGEX1), (v) => {
          const match = v.match(TEL_REGEX1)!;
          const text = `☎ ${match[1]}-${match[2]}-${match[3]}`;
          const content = <a href={`tel:${v}`}>{text}</a>;

          return (
            <Popover content={content}>
              <Button variant="inline-link">{text}</Button>
            </Popover>
          );
        })
        .with(P.string.includes("-"), (v) => {
          const text = `☎ ${v}`;
          const content = <a href={`tel:${v}`}>{text}</a>;

          return (
            <Popover content={content}>
              <Button variant="inline-link">{text}</Button>
            </Popover>
          );
        })
        .otherwise((v) => v),
  },
  {
    id: "email",
    header: (
      <FormattedMessage
        id="features.test.components.UserTable.column.email"
        defaultMessage="EMAIL"
      />
    ),
    cell: (item) => item.email,
  },
  {
    id: "address",
    header: (
      <FormattedMessage
        id="features.test.components.UserTable.column.address"
        defaultMessage="住所"
      />
    ),
    cell: (item) =>
      item.prefecture + item.city + item.streetAddress + item.building,
  },
  {
    id: "createdAt",
    header: (
      <FormattedMessage
        id="features.test.components.UserTable.column.createdAt"
        defaultMessage="登録日"
      />
    ),
    cell: (item) =>
      match(item.createdAt)
        .with(P.nullish, () => "-")
        .with(P.when(isDate), (v) => (
          <FormattedTime
            value={v}
            year="numeric"
            month="2-digit"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
          >
            {(d) => <>{d.replaceAll("/", "-")}</>}
          </FormattedTime>
        ))
        .otherwise(() => "-"),
    sortingField: "createAt",
    ariaLabel: createLabelFunction("createAt"),
    sortingComparator(a, b) {
      return ascCompare(a.createdAt, b.createdAt);
    },
  },
];

export const columnDisplay: ColumnDisplays = [
  {
    id: "id",
    visible: false,
  },
  {
    id: "name",
    visible: true,
  },
  {
    id: "tel",
    visible: true,
  },
  {
    id: "email",
    visible: true,
  },
  {
    id: "address",
    visible: false,
  },
  {
    id: "createdAt",
    visible: true,
  },
];

export const contentDisplayPreferenceOptions = columnDefinitions.map(
  ({ id, header }) => ({
    id: `${id}`,
    label: header as string,
  })
);
