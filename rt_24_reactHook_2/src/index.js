import { render } from 'react-dom'

import {Q02} from './Q02'
import {Q03, LazyLoading} from './Q03'
import {Q05, TypeExp0, TypeExp} from './Q05'
import {Q07, Q07_A, Q07_A1, Q07_B, Q07_C} from './Q07'

const T = true
const F = false
render(
	<div>
		{F && <Q02 />}
		{F && <Q03 />}
		{F && <LazyLoading />}
		{T && <TypeExp0 />}
		{F && <TypeExp />}
		{F && <Q05 />}
		{F && <Q07 />}
		{F && <Q07_A />}
		{F && <Q07_A1 />}
		{F && <Q07_B />}
		{F && <Q07_C />}

	</div>, document.getElementById('root'))
