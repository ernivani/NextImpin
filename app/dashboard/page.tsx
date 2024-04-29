import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";
import { Suspense } from "react";
import AppHeader from "@/components/AppHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Link from "next/link"; // Import the Link component

export default async function Dashboard() {
  await connectMongo();
  const session = await getServerSession(authOptions);
  const user = await User.findById(session.user.id);

  if (!user) {
    throw new Error("User not found");
  }

  const isFreePlan = user.accessLevel === 0;

  console.log(user);
  return (
    <>
      <Suspense>
        <AppHeader />
      </Suspense>
      <main className="min-h-screen p-8 pb-24">
        <section className="max-w-xl mx-auto space-y-8">
          {isFreePlan ? (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                Subscribe to get full access:
              </h1>
              <ButtonCheckout
                mode="subscription"
                priceId={config.stripe.plans[1].priceId}
              />
              <Link href="/cms-builder">
                <span className="text-blue-600 hover:underline">
                  Build your website
                </span>
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                Welcome to your Dashboard
              </h1>
              {/* Display other components or elements relevant to subscribed users */}
              <Link href="/cms-builder">
                <span className="text-blue-600 hover:underline">
                  Go to CMS Builder
                </span>
              </Link>
            </>
          )}
        </section>
      </main>
    </>
  );
}
