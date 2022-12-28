import { component$, Resource } from '@builder.io/qwik';
import { useEndpoint } from '@builder.io/qwik-city';

import {type RequestHandlerCloudflarePages } from '@builder.io/qwik-city/middleware/cloudflare-pages';

interface TimeData {
  unixtime:string
}

export const onGet: RequestHandlerCloudflarePages <TimeData> = async () => {
  // put your DB access here, we are hard coding a response for simplicity.
  const res = await fetch("http://worldtimeapi.org/api/timezone/Asia/Nicosia")
  console.log("query")
//const kv = await platform.env["KV"].get<string>("my")
const time = await res.json()
    
  return {
    unixtime:time.unixtime
  
  };
};

export default component$(() => {
  const timeData = useEndpoint<TimeData>();
  return (
    <Resource
      value={timeData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(time) => (
        <>
          <h1>{time.unixtime}</h1>
          
        </>
      )}
    />
  );
});

