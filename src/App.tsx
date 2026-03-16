import { useRef, useState } from 'react'
import demoData from './demo-data.json';
import './styles/global.css'
import Message from './Message';
import { useEventListener } from './utilities';

const defaultErrors = {
  emptyDocType: false,
  emptyBeginDate: false,
  futureBeginDate: false,
  beginDateGreaterThanEndDate: false,
  emptyEndDate: false,
  futureEndDate: false,
  endDateLessThanBeginDate: false,
  emptyNotice: false,
  noData: false,
  errorResponse: false,
  serviceUnavailable: false
}
function App() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [errors, setErrors] = useState(defaultErrors)
  const [docType, setDocType] = useState("")
  const [begin, setBegin] = useState("")
  const [end, setEnd] = useState("")
  const [selectedNotice, setSelectedNotice] = useState("")
  const [allDates, setAllDates] = useState(false)
  const [success, setSuccess] = useState(false)

  const isSos = docType === 'sos'
  const isReport = docType === 'r1' || docType === 'r3'
  const isDocument = docType === 'monthly-notice'

  // Start event handlers
  const selectTypeRef = useRef<any>(null)
  const selectTypeHandler = (event: any) => {
    setErrors(defaultErrors)
    setDocType(event.detail.value)
  }
  useEventListener(selectTypeRef, 'nys-change', selectTypeHandler)

  const toggleRef = useRef<any>(null)
  const toggleHandler = (event: any) => { setAllDates(event.detail.checked) }
  useEventListener(toggleRef, 'nys-change', toggleHandler)

  const beginDatepickerRef = useRef<any>(null)
  const beginDatepickerHandler = (event: any) => {
    setErrors(prev => ({ ...prev, emptyBeginDate: false, futureBeginDate: false, beginDateGreaterThanEndDate: false }))
    setBegin(event.target.value)
  }
  useEventListener(beginDatepickerRef, 'nys-input', beginDatepickerHandler)

  const endDatepickerRef = useRef<any>(null)
  const endDatepickerHandler = (event: any) => {
    setErrors(prev => ({ ...prev, emptyEndDate: false, futureEndDate: false, endDateLessThanBeginDate: false }))
    setEnd(event.target.value)
  }
  useEventListener(endDatepickerRef, 'nys-input', endDatepickerHandler)

  const selectNoticeRef = useRef<any>(null)
  const selectNoticeHandler = (event: any) => {
    setErrors(prev => ({ ...prev, emptyNotice: false }))
    setSelectedNotice(event.detail.value)
  }
  useEventListener(selectNoticeRef, 'nys-change', selectNoticeHandler)
  // End event handlers

  const clearForm = () => {
    setErrors(defaultErrors)
    setDocType("")
    setBegin("")
    setEnd("")
    setSelectedNotice("")
    setAllDates(false)
    setSuccess(false)
  }
  const handleGenerate = async () => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    if (checkIfInvalid()) return
    setErrors(defaultErrors)
    setSuccess(false)
    setIsGenerating(true)
    // Mock api request
    await delay(2000)
    setIsGenerating(false)
    const randomInt = Math.floor(Math.random() * (4 - 1 + 1) + 1)
    if (randomInt === 1) { setSuccess(true) }
    else if (randomInt === 2) { setErrors(prev => ({ ...prev, noData: true })) }
    else if (randomInt === 3) { setErrors(prev => ({ ...prev, errorResponse: true })) }
    else if (randomInt === 4) { setErrors(prev => ({ ...prev, serviceUnavailable: true })) }

  }
  const checkIfInvalid = () => {
    const emptyDocType = !docType
    const emptyNotice = isDocument && !selectedNotice
    const emptyBeginDate = isReport && !begin
    const emptyEndDate = isReport && !end
    const futureBeginDate = isReport && !!begin && new Date(begin) > new Date()
    const futureEndDate = isReport && !!end && new Date(end) > new Date()
    const beginDateGreaterThanEndDate = isReport && !!begin && !!end && new Date(begin) > new Date(end)
    const endDateLessThanBeginDate = isReport && !!begin && !!end && new Date(end) < new Date(begin)
    setErrors(prev => ({ ...prev, emptyDocType, emptyNotice, emptyBeginDate, emptyEndDate, futureBeginDate, futureEndDate, beginDateGreaterThanEndDate, endDateLessThanBeginDate }))
    return (emptyDocType || emptyNotice || emptyBeginDate || emptyEndDate || futureBeginDate || futureEndDate || beginDateGreaterThanEndDate || endDateLessThanBeginDate)
  }

  const invalidDateError = 'Please enter a valid value. The field is incomplete or has an invalid date.'
  return (
    <form className="outer-wrap">
      <div className="nys-grid-row nys-margin-b-250 sm:mb-4">
        <div className="nys-tablet:nys-grid-col-6"></div>
        <div className="nys-tablet:nys-grid-col-6">
          <nys-select
            label="Type*"
            ref={selectTypeRef}
            value={docType}
            id="select-type"
            disabled={isGenerating}
            aria-disabled={isGenerating}
            showError={errors.emptyDocType}
            errorMessage={errors.emptyDocType ? "Document type is required." : ""}
            aria-label="Select Type"
          >
            {demoData.reportTypes.map((item, i) => {
              return <optgroup key={i} label={item.label}>{item.items.map((item, i) => { return <option key={i} value={item.value}>{item.label}</option> })}</optgroup>
            })}
          </nys-select>
        </div>
      </div>
      {(isReport || isSos) && <>
        <div className="nys-grid-row nys-margin-b-250">
          <div className="nys-tablet:nys-grid-col-6"></div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-toggle
              label="All Dates"
              ref={toggleRef}
              id="docgen-toggle"
              checked={allDates || isSos}
              disabled={isGenerating || isSos}
              aria-disabled={isGenerating}
              size="md"
              noIcon
              aria-label="Toggle All Dates"></nys-toggle>
          </div>
        </div>
        <div className="nys-grid-row nys-margin-b-250">
          <div className="nys-tablet:nys-grid-col-6"></div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-datepicker
              label="Begin*"
              showError={errors.emptyBeginDate || errors.futureBeginDate || errors.beginDateGreaterThanEndDate}
              errorMessage={
                (errors.emptyBeginDate && "Begin date is required" ||
                  errors.futureBeginDate && "Future begin date is not allowed." ||
                  errors.beginDateGreaterThanEndDate && "Begin date must be before end date.") ||
                invalidDateError
              }
              ref={beginDatepickerRef}
              value={begin ? begin : undefined}
              disabled={allDates || isGenerating || isSos}
              aria-disabled={allDates || isGenerating || isSos}
              width="full"
              id="begin-datepicker"
              name="begin-datepicker"
              aria-label="Select Begin Date"
            ></nys-datepicker>
          </div>
        </div>
        <div className="nys-grid-row nys-margin-b-250 ">
          <div className="nys-tablet:nys-grid-col-6"></div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-datepicker
              label="End*"
              showError={errors.emptyEndDate || errors.futureEndDate || errors.endDateLessThanBeginDate}
              errorMessage={
                (errors.emptyEndDate && "End date is required" ||
                  errors.futureEndDate && "Future end date is not allowed." ||
                  errors.endDateLessThanBeginDate && "End date must be after begin date.") ||
                invalidDateError
              }
              ref={endDatepickerRef}
              value={end ? end : undefined}
              disabled={allDates || isGenerating || isSos}
              aria-disabled={allDates || isGenerating || isSos}
              width="full"
              id="end-datepicker"
              name="end-datepicker"
              className={`${errors.emptyEndDate && 'p-invalid'}`}
              aria-label="Select End Date"
            ></nys-datepicker>
          </div>
        </div>
      </>}
      {isDocument && <div className="nys-grid-row nys-margin-b-250 sm:mb-4">
        <div className="nys-tablet:nys-grid-col-6"></div>
        <div className="nys-tablet:nys-grid-col-6">
          <nys-select
            label="Month & Year*"
            showError={errors.emptyNotice}
            errorMessage={errors.emptyNotice ? "Month & Year is required." : ""}
            ref={selectNoticeRef}
            id="select-notice"
            value={selectedNotice}
            disabled={isGenerating}
            aria-disabled={isGenerating}
            aria-label="Select Type">
            {demoData.monthlyNotices.map((item, i) => {
              return <option key={i} value={item.value}>{item.label}</option>
            })}
          </nys-select>
        </div>
      </div>}
      {success && <Message nysType='success' className="response-message">Success!</Message>}
      {errors.noData && <Message nysType='danger' className="response-message">No data found.</Message>}
      {errors.errorResponse && <Message nysType='danger' className="response-message">An error occurred while processing the request.</Message>}
      {errors.serviceUnavailable && <Message nysType='danger' className="response-message">Service is not available.</Message>}

      <div className='nys-display-flex'>
        <nys-button className="nys-margin-r-200" onClick={clearForm} label="Clear" variant="outline" disabled={isGenerating} fullWidth></nys-button>
        <nys-button onClick={handleGenerate} label="Generate" disabled={isGenerating} fullWidth></nys-button>
      </div>
    </form>)
}

export default App
