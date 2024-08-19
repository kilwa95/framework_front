import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  useTheme,
} from '@mui/material';
import { tableData } from '../types';
import { cTableStyles } from './styles';
import { convertBoolean } from 'src/utils/functions';

type CTableProps = {
  data: tableData[];
};

const CTable = ({ data }: CTableProps) => {
  const theme = useTheme();

  const CHAR_LIMIT = 40; // Set the character limit for truncation

  const formatData = (payload: any) => {
    if (typeof payload === 'boolean') {
      return convertBoolean(payload);
    }
    if (Array.isArray(payload)) {
      return payload.join(', ');
    }

    return payload || '';
  };

  const isTextTruncated = (text: string) => text.length > CHAR_LIMIT;

  const renderCellContent = (rowData: tableData) => {
    const formattedData = formatData(rowData.data);

    const displayText = isTextTruncated(formattedData)
      ? `${formattedData.substring(0, CHAR_LIMIT)}...`
      : formattedData;

    return isTextTruncated(formattedData) ? (
      <Tooltip title={formattedData}>
        <span>{displayText}</span>
      </Tooltip>
    ) : (
      formattedData
    );
  };

  return (
    <TableContainer sx={cTableStyles(theme).tableContainer}>
      <Table>
        <TableBody>
          {data?.map((row) => (
            <TableRow sx={cTableStyles(theme).tableRow} key={row.title}>
              <TableCell
                sx={cTableStyles(theme).tableCell}
                component="th"
                scope="row"
              >
                {row.title}
              </TableCell>
              <TableCell sx={cTableStyles(theme).tableCell}>
                {renderCellContent(row)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CTable;
