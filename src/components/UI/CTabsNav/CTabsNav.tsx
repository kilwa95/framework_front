import { Box, Tab, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { TabInfos } from '../types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { cTabsNavStyles } from './styles';
import CStatusPill from '../CStatusPill/CStatusPill';

interface CTabsNavProps {
  tabInfos: TabInfos[];
  // eslint-disable-next-line no-unused-vars
  onChange?: () => void;
  defaultTabOpened?: string;
}

const CTabsNav = ({ tabInfos, onChange, defaultTabOpened }: CTabsNavProps) => {
  const theme = useTheme();

  const [tabIndex, setTabIndex] = useState<string>(
    defaultTabOpened || tabInfos[0].id,
  );

  const handleChangeTabIndex = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setTabIndex(newValue);
    if (onChange) onChange();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <TabContext value={tabIndex}>
        <TabList
          onChange={handleChangeTabIndex}
          aria-label="todo-tabs"
          centered
        >
          {tabInfos.map((tab) => (
            <Tab
              key={`tab-${tab.id}`}
              value={tab.id}
              icon={tab.icon}
              iconPosition="start"
              label={
                <Box sx={cTabsNavStyles(theme).chipNav}>
                  <Typography>{tab.title}</Typography>
                  {tab.notificationsCount !== undefined &&
                    tab.notificationsCount > 0 && (
                      <CStatusPill
                        severity={tabIndex === tab.id ? 'error' : 'neutral'}
                      >
                        {tab.notificationsCount}
                      </CStatusPill>
                    )}
                </Box>
              }
            />
          ))}
        </TabList>
        {tabInfos.map((tab) => (
          <TabPanel
            value={tab.id}
            sx={{ padding: 0 }}
            key={`tab-content-${tab.id}`}
          >
            {tab.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default CTabsNav;
