import BottomNavigation from "../BottomNavigation";
import Topbar from "./Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-100 w-100">
      <Topbar />
      <div className="block-content-desktop">{children}</div>
      <BottomNavigation />
    </div>
  )
}
