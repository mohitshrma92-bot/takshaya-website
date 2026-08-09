import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="market-search">

      <h1>Manufacturing Marketplace</h1>

      <p>
        Discover verified moulds, dies, fixtures and tooling across India.
      </p>

      <div className="market-search-box">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search mould, die, fixture, company..."
        />

      </div>

    </div>
  );
}