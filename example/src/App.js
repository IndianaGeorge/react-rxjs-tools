import React, { useState } from 'react';
import { BehaviorSubject } from 'rxjs';

import Value from './UI/Value';
import FromClass from './UI/FromClass';

export default (props) => {
  const [number$] = useState(new BehaviorSubject(1));
  return (
    <div>
      <div>
        Value via hook: <Value subject={number$} />
      </div>
      <div>
        Value via class: <FromClass subject={number$} />
      </div>
    </div>
  )
}
