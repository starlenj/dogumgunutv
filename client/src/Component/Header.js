const header = () => {
  return (
    <div class="iq-sidebar">
      <div id="sidebar-scrollbar">
        <nav class="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" class="iq-menu">
            <li>
              <a href="/" class="iq-waves-effect"><i class="las la-newspaper"></i><span>Anasayfa</span></a>
            </li>
            <li>
              <a href="/YayinTalebi" class="iq-waves-effect"><i class="las la-user-friends"></i><span>Yayın Taleplerim</span></a>
            </li>
            <li>
              <a href="/YayinTalebi" class="iq-waves-effect"><i class="las la-user-friends"></i><span>Sıkça Sorulan Sorular</span></a>
            </li>
          </ul>
        </nav>
        <div class="p-3"></div>
      </div>
    </div>


  )
}

export default header;