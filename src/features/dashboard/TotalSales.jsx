/* eslint-disable react/prop-types */
import { HiOutlineBanknotes } from "react-icons/hi2";
import Stat from "./Stat";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { GrMoney } from "react-icons/gr";

function TotalSales({ RoomSales }) {
  console.log(RoomSales, "RoomSales");

  if (!RoomSales) return <Spinner />;

  const sales = RoomSales.reduce((acc, cur) => acc + cur.totalSales, 0);
  const extrasSales = RoomSales.reduce((acc, cur) => acc + cur.extrasSales, 0);

  console.log(sales, "sales");

  return (
    <>
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Extras Sales"
        color="indigo"
        icon={<GrMoney />}
        value={formatCurrency(extrasSales)}
      />
    </>
  );
}

export default TotalSales;
