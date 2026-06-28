export interface UserData {
  name: string;
  avatarUrl: string | null;
}

export interface HeaderProps {
  userData?: UserData;
  isAuthPage?: boolean;
}