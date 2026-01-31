/** @format */

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative   max-w-screen-xxl mx-auto flex flex-col min-h-screen">
      <Header />
      <main className="sticky h-screen">{children}</main>
      <Footer />
    </div>
  );
}
