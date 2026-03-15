# Demo NYSDS Custom Input Labels
- We have established that using html labels outside the nys element causes issues so we must use the provided label prop currently.
- nysds input events can be handled with a useEventListener() function located in /src/utilities.ts

## Possible bugs
- For nys-datepicker it seems that selecting the first day of the month doesn't emit an event.
- For nys-datepicker We need to add listeners for both nys-input and nys-blur events because the nys-input event does not fire when the value is entered by clicking the calendar ui.
- For nys-select the border of the select input does not change color when showErrorMessage is true.

## Todo:
- Add responsive styles.
- Improve types.
