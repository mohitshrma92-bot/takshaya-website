import DashboardLayout from "../../layouts/DashboardLayout";
import SearchBar from "../../components/marketplace/SearchBar";
import FilterSidebar from "../../components/marketplace/FilterSidebar";
import ToolGrid from "../../components/marketplace/ToolGrid";
import "../../Styles/marketplace.css";

export default function Marketplace() {
  return (
    <DashboardLayout>

      <div className="marketplace-page">

        <SearchBar />

        <div className="marketplace-layout">

          <FilterSidebar />

          <ToolGrid />

        </div>

      </div>

    </DashboardLayout>
  );
}