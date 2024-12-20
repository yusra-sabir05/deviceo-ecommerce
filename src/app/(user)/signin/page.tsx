import { signIn } from "@/auth";
import Image from "next/image";
import googleLogo from "@/images/googleLogo.png";
import githubLogo from "@/images/githubLogo.png";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/manageSession";
import Container from "@/components/container";
import { SignInForm } from "@/components/signInForm";

const SignInPage = async () => {
  const session = await getSession();

  if (session?.user) {
    redirect("/");
  }
  return (
    <Container className="py-20 flex flex-col items-center justify-center">
      <div className="w-[500px] bg-bgLight p-10 rounded-lg shadow-sm shadow-darkOr/50">
        <div className="mb-5">
          <h2 className="text-xl font-bold">Oauth sign in</h2>
          <div className="flex items-center gap-3 mt-2">
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
              className="flex items-center gap-1 border border-blue-500 font-semibold bg-blue-50 px-2 py-1.5 rounded-md hover:bg-blue-100 duration-300 ease-in-out"
            >
              <Image src={googleLogo} alt="googleImage" className="w-8" />
              <button type="submit">Signin with Google</button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
              className="flex items-center gap-1 border border-slate-500 font-semibold bg-slate-50 px-2 py-1.5 rounded-md hover:bg-slate-200 duration-300 ease-in-out"
            >
              <Image src={githubLogo} alt="githubImage" className="w-8" />
              <button type="submit">Signin with Github</button>
            </form>
          </div>
        </div>
        <SignInForm />
      </div>
    </Container>
  );
};

export default SignInPage;
