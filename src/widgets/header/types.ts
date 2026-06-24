export interface UserData {
  name: string;
  avatarUrl: string;
}

export interface HeaderProps {
  userData?: UserData;
  isAuthPage?: boolean;
}