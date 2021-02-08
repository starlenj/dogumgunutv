import { useEffect, useState } from "react";
function Header({ Oturum }) {
  const [session, SetSession] = useState("");
  useEffect(() => {
    Oturum.then((resp) => SetSession(resp.data.data.data));
  }, []);
  return (
    <div class="navbar navbar-expand-md navbar-dark bg-indigo navbar-static">
      <div class="navbar-brand">
        <a href="/" class="d-inline-block"></a>
      </div>

      <div class="d-md-none">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-mobile"
        >
          <i class="icon-tree5"></i>
        </button>
        <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
          <i class="icon-paragraph-justify3"></i>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="navbar-mobile">
        <span class="navbar-text ml-md-3">
          <span class="badge badge-mark border-orange-300 mr-2"></span>
          Hoşgeldin {session.Name}
        </span>

        <ul class="navbar-nav ml-md-auto">
          <li class="nav-item">
            <a href="/User/Logout" class="navbar-nav-link">
              <i class="icon-switch2"></i>
              <span class="d-md-none ml-2">Çıkış Yap</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Header;
