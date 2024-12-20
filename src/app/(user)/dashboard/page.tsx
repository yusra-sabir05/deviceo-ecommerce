// pages/dashboard.tsx or some appropriate path
import Container from "@/components/container";
import SignOut from "@/components/signOut";
import { getSession, validateSession } from "@/lib/manageSession";
import Image from "next/image";

const DashboardPage = async () => {
  await validateSession();
  const session = await getSession();

  return (
    <Container className="py-10 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6">
        Welcome to Your Dashboard
      </h2>
      <div className="flex items-center gap-6 my-5 p-4 bg-gray-100 rounded-lg shadow-lg">
        <Image
          src={session?.user?.image as string}
          alt="User Image"
          width={80}
          height={80}
          className="rounded-full border-2 border-darkGreen shadow-lg"
        />
        <div>
          <p className="text-xl font-medium text-gray-800">
            {session?.user?.name}
          </p>
          <p className="text-sm text-gray-600">{session?.user?.email}</p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <SignOut className="bg-blueViolet hover:bg-darkblueViolet/90 text-white transition duration-200" />
      </div>
    </Container>
  );
};

export default DashboardPage;
