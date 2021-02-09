import Header from "../../Component/Header";
import SideBar from "../../Component/SideBar";
import YayimTalepForm from "../../Component/YayinTalebi/yayintalebi_form";
import YayinTalebiList from "./yayintalebi_list_page";
function YayinTalebi({ session }) {
    return (
        <div className="wrapper">
            <Header Oturum={session} />
            <SideBar Oturum={session} />
            <YayimTalepForm Oturum={session} />
        </div>
    );
}

export default YayinTalebi;
