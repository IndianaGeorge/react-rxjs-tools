import React, { useState } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';

import FromBehaviorHook from './UI/FromBehaviorHook';
import FromBehaviorComponent from './UI/FromBehaviorComponent';
import FromHook from './UI/FromHook';
import FromComponent from './UI/FromComponent';

export default (props) => {
  const [number$] = useState(new Subject(1));
  const [bnumber$] = useState(new BehaviorSubject(1));
  return (
    <div>
      <h1>Subject</h1>
      <div>
        Counter via useSubject hook: <FromHook subject={number$} />
      </div>
      <div>
        Counter via Subscription component: <FromComponent subject={number$} />
      </div>
      <h1>BehaviorSubject</h1>
      <div>
        Counter via useBehaviorSubject hook: <FromBehaviorHook subject={bnumber$} />
      </div>
      <div>
        Counter via BehaviorSubscription component: <FromBehaviorComponent subject={bnumber$} />
      </div>
    </div>
  )
}
