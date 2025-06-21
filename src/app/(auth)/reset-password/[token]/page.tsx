import ResetPasswordClient from "./ResetPasswordClient";

interface ResetPasswordProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordProps) {
  const { token } = await params;
  return <ResetPasswordClient token={token} />;
}
