import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Countdown from '../components/Countdown';
import HangboardControls from '../components/HangboardControls';
import HangboardText from '../components/HangboardText';
import Routine from '../components/Routine';
import Set from '../components/Set';
import Timer from '../components/Timer';
import { createRoutine } from '../utils';

import defaultProfile from '../profiles/intermediate.json';

const defaultRoutine = createRoutine(defaultProfile);

storiesOf('Countdown', module)
  .add('from three', () => (
    <Countdown seconds={3} />
  ));

storiesOf('HangboardControls', module)
  .add('Default', () => (
    <HangboardControls />
  ));

storiesOf('Routine', module)
  .add('Default', () => (
    <Routine routine={defaultRoutine} />
  ));

storiesOf('Set', module)
  .add('Default', () => (
    <Set set={defaultRoutine.sets[0]} />
  ));

storiesOf('Timer', module)
  .add('active', () => (
    <Timer time={9999} active={true} />
  ))
  .add('inactive', () => (
    <Timer time={9999} active={false} />
  ));
