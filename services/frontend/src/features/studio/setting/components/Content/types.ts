export type StudioSetting = {
  id: string;
  name: string;
  description: string;
  slug: string;
  avatarUrl: string;
  SNSId: string;
  email: string;
  openAt: Date;
  openDuration: number;
  location: {
    address: string;
    name: string;
    id: string;
  };
  suppliers: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
};
