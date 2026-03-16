# Demo NYSDS Custom Input Labels
- We have established that using html labels outside the nys element causes issues so we must use the provided label prop currently.
- nysds input events can be handled with a useEventListener() function located in /src/utilities.ts

## Possible bugs
- nys-datepicker: Selecting the first day of the month doesn't emit an event.
- nys-select: The border of the select input does not change color when showErrorMessage is true.

## Todo:
- Add responsive styles.
- Improve types.
