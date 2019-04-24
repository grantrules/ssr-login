import React from 'react';

import { useQuery } from 'graphql-hooks';

const HOMEPAGE_QUERY = 'query { hi(name:"bill") }';

function MyComponent() {
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {});

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened';

  return (
    <h1>
      {data.hi}
    </h1>
  );
}

export default MyComponent;
