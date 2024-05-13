import Heading from "../ui/Heading";
import Row from "../ui/Row";
import RoomTable from "../features/cabins/RoomTable";
import AddRoom from "../features/cabins/AddRoom";
import RoomTableOperations from "../features/cabins/RoomTableOperations";

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All rooms</Heading>
        <RoomTableOperations />
      </Row>
      <Row>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Rooms;
