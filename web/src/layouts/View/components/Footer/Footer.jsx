// @sito/ui
import { useStyle } from "@sito/ui";

// providers
import { useUser } from "../../../../providers/UserProvider";

function Footer() {
  const { colors } = useStyle();

  const { userState } = useUser();

  return (
    <footer className={`w-full py-5 px-10 sm:px-3 primary filled`}>
      <div className="flex gap-2 justify-start items-start flex-wrap">
        <p className="capitalize">{userState.user?.email?.split("@")[0]}</p>
        <p className="text-[#bbb] capitalize">
          {userState.user?.country ?? "CU"}
        </p>
        <p className="text-[#bbb] capitalize">{userState.user?.phone}</p>
      </div>
    </footer>
  );
}

export default Footer;
