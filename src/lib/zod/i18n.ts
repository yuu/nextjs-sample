import { match, P } from "ts-pattern";
import { type ZodIssueOptionalMessage, type ZodErrorMap, ZodIssueCode, ZodParsedType } from "zod";
import { IntlShape } from "@formatjs/intl";
import { messages } from "@/locales";

const errorMessages = messages.defaults.errors.zod;

export const makeZodErrorMap =
  <T>(intl: IntlShape<T>, messages?: typeof errorMessages): ZodErrorMap =>
  (issue, _) => {
    if (messages) {
      return { message: getDescriptorItem(intl, messages, issue) };
    }

    return { message: getDescriptorItem(intl, errorMessages, issue) };
  };

export function getDescriptorItem<T>(
  intl: IntlShape<T>,
  messages: typeof errorMessages,
  issue: ZodIssueOptionalMessage
) {
  const result = match(issue)
    .with({ code: ZodIssueCode.invalid_type, received: ZodParsedType.undefined }, () =>
      intl.formatMessage(messages.invalid_type_received_undefined)
    )
    .with({ code: ZodIssueCode.invalid_type, received: ZodParsedType.null }, () =>
      intl.formatMessage(messages.invalid_type_received_null)
    )
    .with({ code: ZodIssueCode.invalid_type, received: P._ }, (issue) =>
      intl.formatMessage(messages.invalid_type, {
        expected: intl.formatMessage(messages.types[issue.expected]),
        received: intl.formatMessage(messages.types[issue.received]),
      })
    )
    .with({ code: ZodIssueCode.invalid_literal }, (issue) =>
      intl.formatMessage(messages.invalid_literal, {
        expected: JSON.stringify(issue.expected),
      })
    )
    .with(
      { code: ZodIssueCode.custom },
      () => intl.formatMessage(messages.custom) // TODO: issue.params
    )
    .with({ code: ZodIssueCode.invalid_union }, () => intl.formatMessage(messages.invalid_union))
    .with({ code: ZodIssueCode.invalid_union_discriminator }, (issue) =>
      intl.formatMessage(messages.invalid_union_discriminator, {
        options: issue.options.join(" | "),
      })
    )
    .with({ code: ZodIssueCode.invalid_enum_value }, (issue) =>
      intl.formatMessage(messages.invalid_enum_value, {
        options: issue.options.join(" | "),
        received: issue.received,
      })
    )
    .with({ code: ZodIssueCode.unrecognized_keys }, (issue) =>
      intl.formatMessage(messages.unrecognized_keys, {
        keys: issue.keys.join(", "),
        count: issue.keys.length, // plural
      })
    )
    .with({ code: ZodIssueCode.invalid_arguments }, () =>
      intl.formatMessage(messages.invalid_arguments)
    )
    .with({ code: ZodIssueCode.invalid_return_type }, () =>
      intl.formatMessage(messages.invalid_return_type)
    )
    .with({ code: ZodIssueCode.invalid_date }, () => intl.formatMessage(messages.invalid_date))
    .with(
      {
        code: ZodIssueCode.invalid_string,
        validation: { startsWith: P.not(P.nullish) },
      },
      (issue) =>
        intl.formatMessage(messages.invalid_string_startsWith, {
          startsWith: issue.validation.startsWith,
        })
    )
    .with(
      {
        code: ZodIssueCode.invalid_string,
        validation: { endsWith: P.not(P.nullish) },
      },
      (issue) =>
        intl.formatMessage(messages.invalid_string_endsWith, {
          endsWith: issue.validation.endsWith,
        })
    )
    .with({ code: ZodIssueCode.invalid_string, validation: "regex" }, () =>
      intl.formatMessage(messages.invalid_string_regex)
    )
    .with({ code: ZodIssueCode.invalid_string, validation: P.not(P.nullish) }, (issue) => {
      const validation = match(issue.validation)
        .with("email", () => intl.formatMessage(messages.validations.email))
        .with("url", () => intl.formatMessage(messages.validations.url))
        .with("uuid", () => intl.formatMessage(messages.validations.uuid))
        .with("cuid", () => intl.formatMessage(messages.validations.cuid))
        .with("regex", () => intl.formatMessage(messages.validations.regex))
        .with("datetime", () => intl.formatMessage(messages.validations.datetime))
        .otherwise(() => intl.formatMessage(messages.validations.unknown));

      return intl.formatMessage(messages.invalid_string_any, {
        validation,
      });
    })
    .with({ code: ZodIssueCode.too_small }, (issue) => {
      const minimum = issue.type === "date" ? new Date(issue.minimum as number) : issue.minimum;
      const typev = match(issue.type)
        .returnType<"array" | "string" | "number" | "set" | "date">()
        .with("array", (v) => v)
        .with("string", (v) => v)
        .with("number", (v) => v)
        .with("set", (v) => v)
        .with("date", (v) => v)
        .with("bigint", () => "number")
        .exhaustive();
      const exact = match({ exact: issue.exact, inclusive: issue.inclusive })
        .returnType<"exact" | "inclusive" | "not_inclusive">()
        .with({ exact: true }, () => "exact")
        .with({ inclusive: true }, () => "inclusive")
        .otherwise(() => "not_inclusive");

      return intl.formatMessage(messages.too_small[typev][exact], {
        minimum,
        count: typeof minimum === "number" ? minimum : undefined, // plural
      });
    })
    .with({ code: ZodIssueCode.too_big }, (issue) => {
      const maximum = issue.type === "date" ? new Date(issue.maximum as number) : issue.maximum;
      const typev = match(issue.type)
        .returnType<"array" | "string" | "number" | "set" | "date">()
        .with("array", (v) => v)
        .with("string", (v) => v)
        .with("number", (v) => v)
        .with("set", (v) => v)
        .with("date", (v) => v)
        .with("bigint", () => "number")
        .exhaustive();
      const exact = match({ exact: issue.exact, inclusive: issue.inclusive })
        .returnType<"exact" | "inclusive" | "not_inclusive">()
        .with({ exact: true }, () => "exact")
        .with({ inclusive: true }, () => "inclusive")
        .otherwise(() => "not_inclusive");

      return intl.formatMessage(messages.too_big[typev][exact], {
        maximum, // required l10n
        count: typeof maximum === "number" ? maximum : undefined,
      });
    })
    .with({ code: ZodIssueCode.invalid_intersection_types }, () =>
      intl.formatMessage(messages.invalid_intersection_types)
    )
    .with({ code: ZodIssueCode.not_multiple_of }, (issue) =>
      intl.formatMessage(messages.not_multiple_of, {
        multipleOf: issue.multipleOf as number,
      })
    )
    .with({ code: ZodIssueCode.not_finite }, () => intl.formatMessage(messages.not_finite))
    .exhaustive();

  return result;
}
