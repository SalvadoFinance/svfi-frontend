import React from 'react';
import { Container, ContainerProps, styled } from '@mui/material';

const ContainerWrapCard = styled(Container)<ContainerProps>(({ theme }) => ({
  width: '1188px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: 'box-shadow: 0px 1px 22px rgba(19, 33, 82, 0.08), 0px 0px 4px rgba(19, 33, 82, 0.05)',
  boxSizing: 'border-box',
  '@media (min-width:600px)': {
    padding: '32px 32px 40px',
  },
}));

const ContainerWrap = styled(Container)<ContainerProps>(({ theme }) => ({
  width: '1188px',
  backgroundColor: 'transparent',
  borderRadius: '0',
  boxShadow: theme.shadows[0],
  boxSizing: 'border-box',
  '@media (min-width:600px)': {
    padding: '0',
  },
}));

const SectionLayout: React.FC<ContainerProps & { isCard?: boolean }> = ({ children, isCard, ...props }) => {
  return isCard ? (
    <ContainerWrapCard {...props}>{children}</ContainerWrapCard>
  ) : (
    <ContainerWrap {...props}>{children}</ContainerWrap>
  );
};

SectionLayout.defaultProps = {
  isCard: false,
};

export default SectionLayout;
