import { render } from 'react-dom'

import {Q02} from './Q02'
import {Q03, LazyLoading} from './Q03'
import {Q05, TypeExp} from './Q05'
import {Q07, Q07_A, Q07_A1, Q07_B, Q07_C} from './Q07'

render(
	<div>
		{false && <Q02 />}
		{false && <Q03 />}
		{false && <LazyLoading />}
		{false && <TypeExp />}
		{false && <Q05 />}
		{false && <Q07 />}
		{false && <Q07_A />}
		{false && <Q07_A1 />}
		{true && <Q07_B />}
		{false && <Q07_C />}

	</div>, document.getElementById('root'))
