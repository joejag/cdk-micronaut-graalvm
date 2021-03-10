#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BStack } from '../lib/b-stack';

const app = new cdk.App();
new BStack(app, 'BStack');
