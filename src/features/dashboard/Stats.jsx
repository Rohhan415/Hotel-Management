import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc * cur.totalPrice(), 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc * cur.numNights(), 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="Blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="Blue"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Checkins"
        color="Blue"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="Blue"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: PropTypes.array.isRequired,
  confirmedStays: PropTypes.array.isRequired,
  numDays: PropTypes.number.isRequired,
  cabinCount: PropTypes.number.isRequired,
};

export default Stats;
