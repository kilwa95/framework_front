import {
  Box,
  IconButton,
  Transitions,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AnimatedComponent, {
  AnimationTypeKeys,
} from 'src/components/TransitionsComponents/AnimatedComponent';
import CInfosCard from 'src/components/UI/CInfosCard/CInfosCard';
import { createTransitions } from 'src/theme/create-transition';
import CSelect from 'src/components/UI/CSelect/CSelect';
import CTextField from 'src/components/UI/CTextField/CTextField';

const TransitionCard: React.FC = () => {
  const theme = useTheme();

  const [isComponentVisible, setIsComponentVisible] = useState<
    Record<number, boolean>
  >({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const [delay, setDelay] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);

  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(parseInt(event.target.value, 10));
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value, 10));
  };

  const [easing, setEasing] =
    useState<keyof Transitions['easingCurves']>('easeIn');

  const easingOptions = Object.keys(createTransitions().easingCurves).map(
    (key, index) => ({
      id: index + 1,
      label: key,
    }),
  );

  const [animationType, setAnimationType] =
    useState<AnimationTypeKeys>('translationTop');

  const allAnimationTypeValues: AnimationTypeKeys[] = [
    'opacity',
    'translationTop',
    'translationBottom',
    'translationRight',
    'translationLeft',
  ];

  const animationTypeOptions = allAnimationTypeValues.map((type, index) => ({
    id: index + 1,
    label: type,
  }));

  const handleShowComponent = (componentNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    setIsComponentVisible((prevIsComponentVisible) => ({
      ...prevIsComponentVisible,
      [componentNumber]: !prevIsComponentVisible[componentNumber],
    }));
  };

  return (
    <CInfosTitleWrapper
      title={'Transition'}
      documentation="https://www.framer.com/motion/animation/"
      isBigWrapper
    >
      <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <Box sx={componentsPagesStyles(theme).transitionComponentWrapper}>
            <Box>
              <IconButton onClick={() => handleShowComponent(1)}>
                {isComponentVisible[1] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Box>
            <AnimatedComponent isVisible={isComponentVisible[1]}>
              <CInfosCard />
            </AnimatedComponent>
          </Box>
          <Typography>Basic</Typography>
        </Box>

        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <Box sx={componentsPagesStyles(theme).transitionComponentWrapper}>
            <Box>
              <IconButton onClick={() => handleShowComponent(2)}>
                {isComponentVisible[2] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Box>
            <AnimatedComponent
              isVisible={isComponentVisible[2]}
              noExitAnimation
            >
              <CInfosCard />
            </AnimatedComponent>
          </Box>
          <Typography>No exit animation</Typography>
        </Box>

        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <Box sx={componentsPagesStyles(theme).transitionComponentWrapper}>
            <Box>
              <IconButton onClick={() => handleShowComponent(3)}>
                {isComponentVisible[3] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Box>
            <CTextField
              type="number"
              value={delay}
              minValue={0}
              onChange={handleDelayChange}
              sx={{ width: '100px' }}
            />
            <AnimatedComponent isVisible={isComponentVisible[3]} delay={delay}>
              <CInfosCard />
            </AnimatedComponent>
          </Box>
          <Typography>Delay</Typography>
        </Box>

        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <Box sx={componentsPagesStyles(theme).transitionComponentWrapper}>
            <Box>
              <IconButton onClick={() => handleShowComponent(4)}>
                {isComponentVisible[4] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Box>
            <CTextField
              type="number"
              value={duration}
              minValue={0}
              onChange={handleDurationChange}
              sx={{ width: '100px' }}
            />
            <AnimatedComponent
              isVisible={isComponentVisible[4]}
              duration={duration}
            >
              <CInfosCard />
            </AnimatedComponent>
          </Box>
          <Typography>Duration</Typography>
        </Box>

        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <Box sx={componentsPagesStyles(theme).transitionComponentWrapper}>
            <Box>
              <IconButton onClick={() => handleShowComponent(5)}>
                {isComponentVisible[5] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Box>
            <CSelect
              labelId="easing-select"
              menuItems={easingOptions}
              setValue={setEasing}
              value={easing}
            />
            <AnimatedComponent
              isVisible={isComponentVisible[5]}
              easing={easing}
            >
              <CInfosCard />
            </AnimatedComponent>
          </Box>
          <Typography>Easing</Typography>
        </Box>

        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <Box sx={componentsPagesStyles(theme).transitionComponentWrapper}>
            <Box>
              <IconButton onClick={() => handleShowComponent(6)}>
                {isComponentVisible[6] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Box>
            <CSelect
              labelId="animation-select"
              menuItems={animationTypeOptions}
              setValue={setAnimationType}
              value={animationType}
            />
            <AnimatedComponent
              isVisible={isComponentVisible[6]}
              animations={[animationType, 'opacity']}
            >
              <CInfosCard />
            </AnimatedComponent>
          </Box>
          <Typography>Transition type</Typography>
        </Box>

        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <Box sx={componentsPagesStyles(theme).transitionComponentWrapper}>
            <Box>
              <IconButton onClick={() => handleShowComponent(7)}>
                {isComponentVisible[7] ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gap: theme.spacing(1),
                width: '100%',
                gridTemplateColumns: 'repeat(4, 1fr)',
              }}
            >
              <AnimatedComponent step={4} isVisible={isComponentVisible[7]}>
                <CInfosCard />
              </AnimatedComponent>
              <AnimatedComponent step={3} isVisible={isComponentVisible[7]}>
                <CInfosCard />
              </AnimatedComponent>
              <AnimatedComponent step={2} isVisible={isComponentVisible[7]}>
                <CInfosCard />
              </AnimatedComponent>
              <AnimatedComponent step={1} isVisible={isComponentVisible[7]}>
                <CInfosCard />
              </AnimatedComponent>
            </Box>
          </Box>
          <Typography>Multiple steps</Typography>
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default TransitionCard;
