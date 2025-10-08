import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <main className="h-screen w-screen relative overflow-hidden">
      <Desktop />
      <Taskbar />
    </main>
  );
}
