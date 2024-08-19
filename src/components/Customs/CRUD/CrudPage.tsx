import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from './Modals/style';
import CList from './Modals/CList';
import { ComponementConfig } from './Configs/ComponementConfig';
import { ObjType } from './Functions/base';
interface Props {
  model: string;
}

const CrudPage: React.FC<Props> = ({ model }) => {
  const theme = useTheme();

  type ModelConfigKey = keyof typeof ComponementConfig;
  const getConfig = (key: ModelConfigKey) => ComponementConfig[key];
  const MConfig = getConfig(model as ModelConfigKey);

  const [vObject, setVObject] = useState<any>({});
  const [initObject, setInitObject] = useState<any>({});

  useEffect(() => {
    const initialState: ObjType = {};

    MConfig.fields.forEach((fieldSet: any) => {
      initialState[fieldSet.field] = '';
    });

    setVObject(initialState);
    setInitObject(initialState);
  }, [MConfig.fields]);

  const state = { vObject: vObject, setter: setVObject };
  const initialState = { initObject: initObject, setter: setInitObject };

  return (
    <CInfosTitleWrapper title={MConfig.title} isBigWrapper>
      <Box sx={componentsPagesStyles(theme).fullWidthWrapper}>
        <CList
          model={model}
          MConfig={MConfig}
          state={state}
          initialState={initialState}
        />
      </Box>
    </CInfosTitleWrapper>
  );
};

export default CrudPage;
