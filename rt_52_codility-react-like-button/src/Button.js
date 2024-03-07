import React, { useState } from 'react';
import classNames from 'classnames';

export default function Button (props) {
	const [isPressed, setIsPressed] = useState(false);
    
	const btnClass = classNames({
		'btn-pressed': isPressed,
	});

	return (
		<button
			className={btnClass}
			onClick={() => setIsPressed(!isPressed)}
		>
			{isPressed ? props.label1 : props.label0}
		</button>
	);
}