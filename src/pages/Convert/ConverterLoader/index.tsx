import React from 'react';
import ContentLoader from 'react-content-loader';

const ConverterLoader: React.FC = () => {
  return (
    <ContentLoader style={{ width: '100%' }}>
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="66" />
      <rect x="0" y="80" rx="5" ry="5" width="100%" height="66" />
    </ContentLoader>
  );
};

export default ConverterLoader;
