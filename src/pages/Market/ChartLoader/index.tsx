import React from 'react';
import ContentLoader from 'react-content-loader';

const ChartLoader: React.FC = () => {
  return (
    <ContentLoader style={{ marginTop: 30 }} viewBox="0 0 400 144">
      <rect x="0" y="0" rx="2" ry="2" width="400" height="22" />
      <rect x="0" y="24" rx="2" ry="2" width="400" height="120" />
    </ContentLoader>
  );
};

export default ChartLoader;
