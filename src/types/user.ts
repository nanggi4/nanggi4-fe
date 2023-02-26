export type UserWithAccessToken = {
  accessToken: string;
  user: {
    name: string;
    id: string;
  }
}

export type User = {
  name: string;
  id: string;
} | undefined;