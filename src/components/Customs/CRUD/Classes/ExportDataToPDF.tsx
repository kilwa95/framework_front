/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
// ExportDataToPDF.tsx
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    marginRight: 5,
    width: '150px',
  },
  input: {
    fontSize: 12,
    marginBottom: 10,
    padding: 5,
    border: '1px solid #ccc',
    borderRadius: 5,
    flexGrow: 1,
  },
});

interface ModalShowProps {
  dataProps: any;
  error?: string;
  errorMessage?: string;
}

const ExportDataToPDF: React.FC<ModalShowProps> = ({ dataProps }) => {
  console.log(dataProps);

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default ExportDataToPDF;
