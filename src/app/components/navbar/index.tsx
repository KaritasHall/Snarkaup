import Menubar from "../menubar";

const Navbar = () => {
  return (
    <div className="px-fluid-x lg:pb-30 pb-10">
      <nav className="h-120 lg:pb-18 lg:h-88 flex w-full justify-between bg-red-200 py-16 lg:pt-24">
        <div className="flex-row">
          <h1>Logo</h1>
          <p>Searchbar</p>
        </div>
        <p>Cart</p>
      </nav>
      <Menubar />
    </div>
  );
};

export default Navbar;
