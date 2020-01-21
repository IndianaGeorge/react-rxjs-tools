import React, { useState } from 'react';
import { BehaviorSubject } from 'rxjs';

import FromHook from './UI/FromHook';
import FromComponent from './UI/FromComponent';

export default (props) => {
  const [number$] = useState(new BehaviorSubject(1));
  return (
    <div>
      <div>
        Counter via hook: <FromHook subject={number$} />
      </div>
      <div>
        Counter via class: <FromComponent subject={number$} />
      </div>
    </div>
  )
}
