export type StudioSetting = {
  id: number;
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
    id: number;
  };
  suppliers: {
    id: number;
    name: string;
    avatarUrl: string;
  }[];
};
