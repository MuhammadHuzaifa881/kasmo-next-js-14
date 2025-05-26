import { redirect } from "next/navigation";
import { getTokenCookie } from "@/lib/cookies";
import { ROUTES } from "@/lib/constants";

const LoginPage = () => {
  const token = getTokenCookie();
  if (token) redirect(ROUTES.DASHBOARD);

  return (
    <div>
      Login screen
    </div>
  );
};

export default LoginPage;