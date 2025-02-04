import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define a type for your tickets
type Ticket = {
  Statut: string;
  'Site(s) code(s) concerné(s)'?: string;
};

// Define a type for the series data
type SeriesData = {
  name: string;
  data: number[];
};

const CTinyBarChartCard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [chartSeries, setChartSeries] = useState<SeriesData[]>([
    { name: 'Tickets', data: [] },
  ]);
  const theme = useTheme();
  const [chartCategories, setChartCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3001/PlaintesMobiles/')
      .then((response) => response.json())
      .then((data: Ticket[]) => {
        setTickets(data);
        processData(data, statusFilter);
      });
  }, []);

  useEffect(() => {
    processData(tickets, statusFilter);
  }, [statusFilter, tickets]);

  const processData = (data: Ticket[], filter: string) => {
    const filteredTickets =
      filter === 'All'
        ? data
        : data.filter((ticket) => ticket.Statut === filter);

    const siteData: Record<string, number> = {};

    filteredTickets.forEach((ticket) => {
      if (ticket['Site(s) code(s) concerné(s)']) {
        const sites = ticket['Site(s) code(s) concerné(s)'].split('\n');

        sites.forEach((site) => {
          siteData[site] = (siteData[site] || 0) + 1;
        });
      }
    });

    const chartData: SeriesData = {
      name: 'Tickets',
      data: Object.values(siteData),
    };

    setChartSeries([chartData]);
    setChartCategories(Object.keys(siteData));
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const chartOptions = {
    chart: {
      height: 350,
      type: 'bar' as const,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    grid: {
      row: {
        colors: ['#fff', theme.palette.background.paper],
      },
    },
    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: chartCategories,
      tickPlacement: 'on',
    },
    yaxis: {
      title: {
        text: 'Nombres de Tickets',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
      custom: function ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
        w: {
          globals: {
            categoryLabels: string[];
          };
        };
      }) {
        const siteCode = w.globals.categoryLabels[dataPointIndex];
        const ticketCount = series[seriesIndex][dataPointIndex];

        return (
          `<div style="background:${theme.palette.background.paper} ; color= ${theme.palette.primary.light} padding: ${theme.spacing(4)} !important; border: 1px solid ${theme.palette.background.paper}!important; border-radius: 5px;">` +
          `<div><strong>Site Code:</strong> ${siteCode}</div>` +
          `<div><strong>Tickets:</strong> ${ticketCount}</div>` +
          '</div>'
        );
      },
    },
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h2">
          Les sites ayant le plus de plaintes actives
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Select value={statusFilter} onChange={handleStatusChange}>
          <MenuItem value="All">Tout</MenuItem>
          <MenuItem value="Traité">Traité</MenuItem>
          <MenuItem value="Refusé">Refusé</MenuItem>
        </Select>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={550}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default CTinyBarChartCard;
