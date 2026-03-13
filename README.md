# Demo NYSDS Custom Input Labels
- We have established that using html labels outside the nys element causes issues so we must use the provided label prop currently.
- Using the provided label prop here only causes a minor design change that I'm sure will be approved.
- nysds input events can be handled with a useEventListener() function located in /src/utilities.ts
- Error handling can be managed using the nysds showError and errorMessage input props.


## Possible bugs
- For nys-datepicker it seems that selecting the first day of the month doesn't emit an event.
- For nys-datepicker We need to add listeners for both nys-input and nys-blur events because the nys-input event does not fire when the value is entered by clicking the calendar ui. Note: I'm not sure if this is still an issue with v1.15.0.
- For nys-select the border of the select input does not change color when showErrorMessage is true.

## Todo:
- Add responsive styles.
- Improve types.