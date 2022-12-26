import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IPositionList } from '_src/services/tokens/types';

import { columns, createData } from './column';

export interface IOpenPositionTable {
  data: IPositionList['positions'];
}

const OpenPositionTable: React.FC<IOpenPositionTable> = ({ data }) => {
  const navigate = useNavigate();

  const rows = data.map((item) => {
    return createData(item);
  });

  return (
    <TableContainer sx={{ maxHeight: 778, marginBottom: '24px' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow style={{ height: '48px' }}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth,
                  fontSize: '14px',
                  borderBottomColor: '#EFEFEF',
                  padding: '0 0 16px 0',
                  color: '#999',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow
                hover
                role="checkbox"
                style={{ height: '72px' }}
                sx={{
                  '&.MuiTableRow-hover:hover': {
                    backgroundColor: '#F9F8F7',
                  },
                  cursor: 'pointer',
                }}
                tabIndex={-1}
                key={index}
                onClick={() => {
                  console.log('点击');
                  // navigate(pageURL.autoInvest.replace(':id', row.data.id));
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ padding: 0, borderBottomColor: 'transparent' }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

OpenPositionTable.defaultProps = {
  data: [],
};

export default OpenPositionTable;
