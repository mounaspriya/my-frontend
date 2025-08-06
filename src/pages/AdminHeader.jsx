// import { FaSearch } from "react-icons/fa";
// import '../styles/AdminHeader.css'

// export default function Header() {
//   return (
//     <header className="header">
//       <div className="logo">GBIT</div>
//       <div className="tabs">
//         <a href="#" className="tab active">WORKSTREAM</a>
//         <a href="/new-record" className="tab">NEW RECORD</a>
//       </div>
//       <div className="header-right">
//         <FaSearch className="icon" />
//         <div className="avatar-circle">JB</div>
//       </div>
//     </header>
//   );
// }


import { FaSearch } from "react-icons/fa";
import '../styles/AdminHeader.css'

export default function Header() {
  return (
    <header className="gbit-header">
      <div className="gbit-logo">GBIT</div>

      <div className="gbit-tabs">
        <div className="tab active">WORKSTREAM</div>
        <div className="tab">NEW RECORD</div>
      </div>

      <div className="gbit-right">
        <FaSearch className="search-icon" />
        <div className="avatar">JB</div>
      </div>
    </header>
  );
}
