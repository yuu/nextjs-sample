import { defineMessages } from "react-intl";

export const i18n = {
  UserForm: {
    familyName: defineMessages({
      label: {
        id: "features.test.components.UserForm.familyName.label",
        defaultMessage: "氏",
      },
    }),
    firstName: defineMessages({
      label: {
        id: "features.test.components.UserForm.firstName.label",
        defaultMessage: "名",
      },
    }),
    tel: defineMessages({
      label: {
        id: "features.test.components.UserForm.tel.label",
        defaultMessage: "TEL",
      },
    }),
    email: defineMessages({
      label: {
        id: "features.test.components.UserForm.email.label",
        defaultMessage: "メールアドレス",
      },
    }),
    postalCode: defineMessages({
      label: {
        id: "features.test.components.UserForm.postalCode.label",
        defaultMessage: "郵便番号",
      },
    }),
    prefecture: defineMessages({
      label: {
        id: "features.test.components.UserForm.prefecture.label",
        defaultMessage: "都道府県",
      },
    }),
    city: defineMessages({
      label: {
        id: "features.test.components.UserForm.city.label",
        defaultMessage: "市町村",
      },
    }),
    streetAddress: defineMessages({
      label: {
        id: "features.test.components.UserForm.streetAddress.label",
        defaultMessage: "市町村以外",
      },
    }),
    building: defineMessages({
      label: {
        id: "features.test.components.UserForm.building.label",
        defaultMessage: "ビルや建物名",
      },
    }),
  },
  Empty: defineMessages({
    text: {
      id: "features.test.components.Empty.text",
      defaultMessage: "データがありません",
    },
  }),
};
