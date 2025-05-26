import { redirect } from "next/navigation";
import { getTokenCookie } from "@/lib/cookies";
import { ROUTES } from "@/lib/constants";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const SignupPage = () => {
  const token = getTokenCookie();
  if (token) redirect(ROUTES.DASHBOARD);

  const { signup } = useAuth();

  return (
    <div>
     Register here
    </div>
  );
};

export default SignupPage;