type Address = {
  postalCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
  building: string;
};

export type Test = {
  id: number;
  familyName: string;
  firstName: string;
  tel: string | null;
  email: string;
  createdAt: Date | null;
} & Address;
