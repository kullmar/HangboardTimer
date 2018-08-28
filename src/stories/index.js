import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Countdown from '../components/Countdown';
import HangboardControls from '../components/HangboardControls';
import HangboardText from '../components/HangboardText';
import Routine from '../components/Routine';
import { createRoutine } from '../utils';

import defaultProfile from '../profiles/intermediate.json';

const defaultRoutine = createRoutine(defaultProfile);

storiesOf('Countdown', module)
  .add('Default', () => (
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