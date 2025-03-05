import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CodeBlock from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock
};

export default meta;

type CodeBlockStory = StoryObj<typeof CodeBlock>;

export const Default: CodeBlockStory = {
  args: { title: 'CodeBlock', code: "let test = test code", language: 'js' },
  render: (args) => <CodeBlock {...args} />
};