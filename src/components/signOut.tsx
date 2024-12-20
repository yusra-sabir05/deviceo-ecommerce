import { signOut } from "@/auth";

interface SignOutProps {
  className?: string; // Optional className prop
}

const SignOut: React.FC<SignOutProps> = ({ className }) => {
  return (
    <form
      action={async () => {
        "use server"; // Ensures this action runs on the server
        await signOut();
      }}
    >
      <button
        type="submit"
        className={`border border-gray-400 px-4 py-2 text-sm font-semibold rounded-md hover:text-white text-white duration-300 ease-in-out ${className}`}
      >
        Sign Out
      </button>
    </form>
  );
};

export default SignOut;
