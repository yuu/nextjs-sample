import { type ButtonDropdownProps } from "@cloudscape-design/components";
import { generateCSV } from "@/lib/csv";
import { type Test } from "@/model/test";

const toCSV = (users: Array<Test>) => {
  const header = [["氏", "名", "電話番号", "email", "住所", "ID", "登録日"]];
  const data = users.map((user) => {
    return [
      user.familyName,
      user.firstName,
      user.tel ?? "",
      user.email,
      [
        user.postalCode,
        user.prefecture,
        user.city,
        user.streetAddress,
        user.building,
      ].join(" "),
      user.id.toString(),
      user.createdAt?.toDateString() ?? "",
    ];
  });

  return header.concat(data);
};

export const useUserTableAction = (users: Array<Test>) => {
  const handleItemClick = ({
    detail: { id },
  }: CustomEvent<ButtonDropdownProps.ItemClickDetails>) => {
    switch (id) {
      case "export":
        generateCSV(toCSV(users), "会員一覧.csv");
        break;
      case "edit":
        break;
      case "delete":
        break;
    }
  };

  return { handleItemClick };
};
