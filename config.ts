export const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : process.env.NEXT_PUBLIC_SERVER_URL;
