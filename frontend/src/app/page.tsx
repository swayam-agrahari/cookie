import Lander from ".";
import Header from "../../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen text-white bg-[var(--primary)] ">
    <Header/>
   
      
      <Lander/>
      
    </div>
    );
}
