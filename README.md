# Demo NYSDS Custom Input Labels
- Custom labels could be used with the nysds input components instead of the built in label prop.
- nysds input events can be handled with useRef, useEffect, and useState.
- Error handling can be managed using the nysds showError and errorMessage input props.


## Possible bugs
- For nys-datepicker it seems that selecting the first day of the month doesn't emit an event.
- For nys-datepicker We need to add listeners for both nys-input and nys-blur events because the nys-input event does not fire when the value is entered by clicking the calendar ui.
- For nys-select the border of the select input does not change color when showErrorMessage is true.

## Todo:
- Add responsive styles.
- Improve types.