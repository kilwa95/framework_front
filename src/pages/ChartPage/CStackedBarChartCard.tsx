import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CStackedBarChartCard: React.FC = () => {
  const [seriesData, setSeriesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/PlaintesMobiles/');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        processTicketData(data);
      } catch (error) {
        console.error('Fetch data error:', error);
      }
    };

    const processTicketData = (data: any[]) => {
      const regionMap: Record<string, any> = {};

      data.forEach((ticket) => {
        const region = ticket['Région'];
        const rootCause = ticket['Root Cause'];

        if (!regionMap[region]) {
          regionMap[region] = {
            region,
            Couverture: 0,
            'Dégradation KPIs': 0,
            'Pas de défaut constaté': 0,
            'Perte du trafic': 0,
            'Perte partielle du service': 0,
            'Perte totale du service': 0,
            '(vide)': 0,
          };
        }

        regionMap[region][rootCause] += 1;
      });

      // Transform the map into an array
      const formattedData = Object.values(regionMap);

      setSeriesData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
            Groupement d&apos;Anomalies par Région
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={seriesData} style={{ margin: '20px' }}>
              <XAxis
                dataKey="region"
                angle={-18} // Rotate the labels
                textAnchor="end"
                interval={0}
                fontSize={10} // Ensure all labels are shown
              />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ bottom: -60, left: 20 }} />
              <Bar dataKey="Couverture" stackId="a" fill="#8884d8" />
              <Bar dataKey="Dégradation KPIs" stackId="a" fill="#82ca9d" />
              <Bar
                dataKey="Pas de défaut constaté"
                stackId="a"
                fill="#ffc658"
              />
              <Bar dataKey="Perte du trafic" stackId="a" fill="#ff6347" />
              <Bar
                dataKey="Perte partielle du service"
                stackId="a"
                fill="#ff99cc"
              />
              <Bar
                dataKey="Perte totale du service"
                stackId="a"
                fill="#66b3ff"
              />
              <Bar dataKey="(vide)" stackId="a" fill="#b3b3b3" />
            </BarChart>
          </ResponsiveContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CStackedBarChartCard;
