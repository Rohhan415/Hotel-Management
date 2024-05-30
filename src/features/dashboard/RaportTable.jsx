import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from "../../ui/Heading";

const TableWrapper = styled.div`
  width: 100%;
  margin: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  
`;

const Table = styled.table `
width: 100%;
border-collapse: collapse;

`;

const Th = styled.th`
border: 1px solid #ddd;
padding: 20px;
background-color: #f2f2f2;
text-align: left;
`;

const Td = styled.td`
border: 1 px solid #ddd;
padding: 8px;
`;

const Tr = styled.tr`
&:nth-child(even) {
    background-color: #f9f9f9;
}

&:hover {
    background-color: #ddd;
}
`;

function RaportTable({data}) {
    

    return (
        <TableWrapper>
        <Heading as= "h4">Sales for each room</Heading>
        <Table>
            <thead>
                <tr>
                    <Th>Room Name</Th>
                    <Th>Total Sales</Th>
                    <Th>Extras Sales</Th>
                    <Th>Max Price</Th>
                </tr>
            </thead>
            <tbody>
                {data.map(data => (
                    <Tr key={data.id}>
                        <Td>{data.name}</Td>
                        <Td>{data.totalSales}$</Td>
                        <Td>{data.extrasSales}$</Td>
                        <Td>{data.maxPrice}$</Td>
                    </Tr>
                ))}
            </tbody>
        </Table>
        </TableWrapper>
    );
}

RaportTable.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        totalSales: PropTypes.number.isRequired,
        extrasSales: PropTypes.number.isRequired,
        maxPrice: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

export default RaportTable;