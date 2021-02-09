import Header from "../../Component/Header";
import LiveStreams from "../../Component/LiveStream";
import SideBar from "../../Component/SideBar";
function Home({ session }) {
  return (
    <div className="wrapper">
      <Header Oturum={session} />
      <SideBar Oturum={session} />
      <LiveStreams />
    </div>
  );
}

export default Home;
