"use client";

import { Container } from "@/shared/Container";

// import { useRouter } from "next/navigation";

export default function DashboardPage() {
  // const router = useRouter();

  // const handleLogout = () => {
  //   router.push("/login");
  // };

  return (
    <Container className="h-40 flex items-center justify-center">
      <h1 className="text-5xl text-green-dark">Dashboard Page</h1>
    </Container>
  );
}
