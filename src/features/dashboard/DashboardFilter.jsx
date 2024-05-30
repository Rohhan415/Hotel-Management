import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function DashboardFilter() {
  return (
    <>
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ]}
      />
      <SortBy
        options={[

          { 
            value: "totalSales-desc", 
            label: "Sort table by total sales (hight first)" },
          { 
            value: "totalSales-asc", 
            label: "Sort table by total sales (low first)" },
          {
            value: "extrasSales-desc",
            label: "Sort table by extras sales (hight first)" },
          {
            value: "extrasSales-asc",
            label: "Sort table by extras sales (low first)" },
          { 
            value: "maxPrice-desc", 
            label: "Sort table by max price (hight first)" },
          { 
            value: "maxPrice-asc", 
            label: "Sort table by max price (low first)" },
        ]}
      />
    </>

    
  );
}

export default DashboardFilter;
