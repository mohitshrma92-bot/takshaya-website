export default function FilterSidebar() {
  return (
    <aside className="filter-sidebar">

      <h3>Filters</h3>

      <label>

        Industry

        <select>

          <option>All Industries</option>

          <option>Automotive</option>

          <option>Medical</option>

          <option>Packaging</option>

          <option>Electronics</option>

        </select>

      </label>

      <label>

        Tool Type

        <select>

          <option>All</option>

          <option>Mould</option>

          <option>Die</option>

          <option>Fixture</option>

        </select>

      </label>

      <label>

        State

        <select>

          <option>All States</option>

          <option>Maharashtra</option>

          <option>Gujarat</option>

          <option>Tamil Nadu</option>

          <option>Karnataka</option>

        </select>

      </label>

    </aside>
  );
}