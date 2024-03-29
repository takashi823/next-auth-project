import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

// ログイン画面
export const Login = () => {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <LogoutButton />
      </div>
    </main>
  );
};
