import Menubar from "../menubar";
import SearchBar from "../searchbar";

const Navbar = () => {
  return (
    <div className="px-fluid-x pb-10 lg:pb-30">
      <nav className="flex h-120 w-full gap-24 py-16 lg:h-88 lg:pb-18 lg:pt-24">
        <h1>Logo</h1>
        <SearchBar placeholder="Search" />
        <p>Cart</p>
      </nav>
      {/* <Menubar /> */}
    </div>
  );
};

export default Navbar;
