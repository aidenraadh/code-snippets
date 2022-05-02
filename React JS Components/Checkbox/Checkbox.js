import React from 'react';

/*
|--------------------------------------------------------------------------
| Checkbox
|--------------------------------------------------------------------------
|
| Must declared properties:
|
| #1 name
| Represents the name of the checkbox
|
| name value: (str)checkbox_name
|
| #2 value
| Represents the value of the checkbox
|
| name value: (str)checkbox_value
|
*/

function Checkbox(props){
	return (
		<label>
			<input type="checkbox" name={props.name} value={props.value} />
			{props.label}
		</label>
	);
}

export default Checkbox;
