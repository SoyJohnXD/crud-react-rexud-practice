export interface ListUsers {
  setUserIdEdit: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserForm {
  userIdEdit: string;
  setUserIdEdit: React.Dispatch<React.SetStateAction<string>>;
}
