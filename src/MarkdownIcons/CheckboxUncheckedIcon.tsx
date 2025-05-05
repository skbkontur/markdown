import React from 'react';

import { useTheme } from '../styles/styled-components';

export const CheckboxUncheckedIcon = () => {
  const { colors } = useTheme();

  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.76172 5.73333C2.76172 3.67147 4.43319 2 6.49505 2H15.0284C17.0902 2 18.7617 3.67147 18.7617 5.73333V14.2667C18.7617 16.3285 17.0902 18 15.0284 18H6.49505C4.43319 18 2.76172 16.3285 2.76172 14.2667V5.73333ZM6.49505 3.06667C5.02229 3.06667 3.82839 4.26057 3.82839 5.73333V14.2667C3.82839 15.7394 5.02229 16.9333 6.49505 16.9333H15.0284C16.5011 16.9333 17.6951 15.7394 17.6951 14.2667V5.73333C17.6951 4.26057 16.5011 3.06667 15.0284 3.06667H6.49505Z"
        fill={colors.grayDefault}
      />
    </svg>
  );
};
