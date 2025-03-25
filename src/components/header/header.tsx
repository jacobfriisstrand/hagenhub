import Logo from "./logo";
import Menu from "./menu";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <header>
      <Logo />
      <SearchBar />
      <Menu />
    </header>
  );
}
