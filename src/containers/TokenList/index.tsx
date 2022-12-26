import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';

import pageURL from '_constants/pageURL';
import { columns, createData } from './column';
import { IMarkets } from '_src/services/tokens/types';
import { ChainStore } from '_src/stores/ChainStore';

export interface ITokenList {
  data: IMarkets['coins'];
}

const TokenList: React.FC<ITokenList> = ({ data }) => {
  const navigate = useNavigate();
  const chainList = useSnapshot(ChainStore);

  const rows = data.map((item) => {
    return createData(item);
  });

  // maxHeight: 778,
  return (
    <TableContainer sx={{ marginBottom: '24px' }}>
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
                  navigate(
                    pageURL.autoInvest
                      .replace(':chainName', chainList.chain.chainName)
                      .replace(':coinId', row.data.coinBase.id)
                      .replace(':coinAddress', row.data.coinBase.contractAddress),
                  );
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

TokenList.defaultProps = {
  data: [],
};

export default TokenList;
