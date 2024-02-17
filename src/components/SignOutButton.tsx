"use client";

import { signOut } from "next-auth/react";
import { Button } from "./Button";

export const SignOutButton = () => {
  return (
    <Button variant="primary" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
