import { useEffect, useRef, useState } from 'react'
import demoData from './demo-data.json';
import './styles/global.css'
import Message from './Message';

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
  useEffect(() => {
    if (selectTypeRef.current) {
      selectTypeRef.current.addEventListener('nys-change', (event: any) => {
        setErrors(defaultErrors)
        setDocType(event.detail.value)
      })
    }
  })

  const toggleRef = useRef<any>(null)
  useEffect(() => {
    if (toggleRef.current) {
      toggleRef.current.addEventListener('nys-change', (event: any) => {
        setAllDates(event.detail.checked)
      })
    }
  })

  const beginDatepickerRef = useRef<any>(null)
  useEffect(() => {
    if (beginDatepickerRef.current) {
      beginDatepickerRef.current.addEventListener('nys-blur', (event: any) => {
        setErrors(prev => ({ ...prev, emptyBeginDate: false, futureBeginDate: false, beginDateGreaterThanEndDate: false }))
        setBegin(event.target.value)
      })
      beginDatepickerRef.current.addEventListener('nys-input', (event: any) => {
        setErrors(prev => ({ ...prev, emptyBeginDate: false, futureBeginDate: false, beginDateGreaterThanEndDate: false }))
        setBegin(event.target.value)
      })
    }
  })

  const endDatepickerRef = useRef<any>(null)
  useEffect(() => {
    if (endDatepickerRef.current) {
      endDatepickerRef.current.addEventListener('nys-blur', (event: any) => {
        setErrors(prev => ({ ...prev, emptyEndDate: false, futureEndDate: false, endDateLessThanBeginDate: false }))
        setEnd(event.target.value)
      })
      endDatepickerRef.current.addEventListener('nys-input', (event: any) => {
        setErrors(prev => ({ ...prev, emptyEndDate: false, futureEndDate: false, endDateLessThanBeginDate: false }))
        setEnd(event.target.value)
      })
    }
  })

  const selectNoticeRef = useRef<any>(null)
  useEffect(() => {
    if (selectNoticeRef.current) {
      selectNoticeRef.current.addEventListener('nys-change', (event: any) => {
        setErrors(prev => ({ ...prev, emptyNotice: false }))
        setSelectedNotice(event.detail.value)
      })
    }
  })
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
          <div className="nys-tablet:nys-grid-col-6">
            <div className="input-label-wrap nys-tablet:nys-flex-justify-end">
              <label htmlFor="select-type" className={`input-label ${errors.emptyDocType && 'error'} ${isGenerating && 'disabled'}`}>Type*</label>
            </div>
          </div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-select
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
            <div className="nys-tablet:nys-grid-col-6">
              <div className="input-label-wrap toggle nys-tablet:nys-flex-justify-end">
                <label htmlFor='docgen-toggle' className={`input-label ${isGenerating && 'disabled'}`}>All Dates</label>
              </div>
            </div>
            <div className="nys-tablet:nys-grid-col-6">
              <nys-toggle 
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
            <div className="nys-tablet:nys-grid-col-6">
              <div className="input-label-wrap nys-tablet:nys-flex-justify-end">
                <label htmlFor='begin-datepicker' className={`input-label ${(errors.emptyBeginDate || errors.futureBeginDate || errors.beginDateGreaterThanEndDate) && 'error'} ${(allDates || isGenerating || isSos) && 'disabled'}`}>Begin*</label>
              </div>
            </div>
            <div className="nys-tablet:nys-grid-col-6">
              <nys-datepicker
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
            <div className="nys-tablet:nys-grid-col-6">
              <div className="input-label-wrap nys-tablet:nys-flex-justify-end">
                <label htmlFor='end-datepicker' className={`input-label ${(errors.emptyEndDate || errors.futureEndDate || errors.endDateLessThanBeginDate) && 'error'} ${(allDates || isGenerating || isSos) && 'disabled'}`}>End*</label>
              </div>
            </div>
            <div className="nys-tablet:nys-grid-col-6">
              <nys-datepicker
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
          <div className="nys-tablet:nys-grid-col-6">
            <div className="input-label-wrap nys-tablet:nys-flex-justify-end">
              <label htmlFor='select-notice' className={`input-label ${errors.emptyNotice && 'error'} ${isGenerating && 'disabled'}`}>Month &amp; Year*</label>
            </div>
          </div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-select
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
