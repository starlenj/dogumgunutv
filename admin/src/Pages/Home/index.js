import Header from "../../Component/Header";
import SideBar from "../../Component/SideBar";
function Home({ session }) {
  return (
    <div>
      <Header Oturum={session} />
      <SideBar Oturum={session} />
    </div>
  );
}

export default Home;
