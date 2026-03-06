import { useEffect, useRef, useState } from 'react'
import demoData from './demo-data.json';
import './App.css'
import './styles/global.css'
import './styles/utilities.css'
import Message from './Message';

function App() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [errors, setErrors] = useState({} as any)
  const [docType, setDocType] = useState("")
  const [begin, setBegin] = useState({} as any)
  const [end, setEnd] = useState({} as any)
  const [allDates, setAllDates] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState({} as any)

  const isSos = docType === 'sos'
  const isReport = (value: string) => value === 'r1' || value === 'sos' || value === 'r3'

  // Start event handlers
  const selectTypeRef = useRef<any>(null)
  useEffect(() => {
    if (selectTypeRef.current) {
      selectTypeRef.current.addEventListener('nys-change', (event: any) => {
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
      // POSSIBLE BUG: We need to add listeners for both nys-input and nys-blur events because
      // the nys-input event does not fire when the value is entered by clicking
      // the calendar ui.
      beginDatepickerRef.current.addEventListener('nys-blur', (event: any) => {
        setBegin(event.target)
      })
      beginDatepickerRef.current.addEventListener('nys-input', (event: any) => {
        setBegin(event.target)
      })
    }
  })

  const endDatepickerRef = useRef<any>(null)
  useEffect(() => {
    if (endDatepickerRef.current) {
      endDatepickerRef.current.addEventListener('nys-blur', (event: any) => {
        setEnd(event.target)
      })
      endDatepickerRef.current.addEventListener('nys-input', (event: any) => {
        setEnd(event.target)
      })
    }
  })

  const selectNoticeRef = useRef<any>(null)
  useEffect(() => {
    if (selectNoticeRef.current) {
      selectNoticeRef.current.addEventListener('nys-change', (event: any) => {
        setDocType(event.detail.value)
      })
    }
  })
  // End event handlers

  const clearForm = () => {}
  const handleGenerate = () => {}

  const invalidDateError = 'Please enter a valid value. The field is incomplete or has an invalid date.'
  return (
    <div className="outer-wrap">
      <div className="nys-grid-row mb-2 sm:mb-4">
        <div className="nys-tablet:nys-grid-col-6">
          <div className="input-label-wrap nys-tablet:nys-flex-justify-end">
            <label htmlFor="select-type" className={`input-label ${errors.show && errors.selectType && 'p-error'} ${isGenerating && 'p-disabled'}`}>Type*</label>
          </div>
        </div>
        <div className="nys-tablet:nys-grid-col-6">
          <nys-select
            ref={selectTypeRef}
            value={docType}
            id="select-type"
            disabled={isGenerating}
            showError={errors.show && errors.selectType}
            errorMessage={errors.show && (errors.selectType && "Document type is required.") || ""}
          >
            {demoData.reportTypes.map((item, i) => {
              return <optgroup key={i} label={item.label}>{item.items.map((item, i) => { return <option key={i} value={item.value}>{item.label}</option> })}</optgroup>
            })}
          </nys-select>
        </div>
      </div>
      {isReport(docType) && <>
        <div className="nys-grid-row mb-2 sm:mb-4">
          <div className="nys-tablet:nys-grid-col-6">
            <div className="input-label-wrap toggle nys-tablet:nys-flex-justify-end">
              <label htmlFor='docgen-toggle' className={`input-label ${isGenerating && 'p-disabled'}`}>All Dates</label>
            </div>
          </div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-toggle ref={toggleRef} id="docgen-toggle" checked={allDates || isSos ? true : undefined} disabled={isGenerating || isSos ? true : undefined} size="md" icon={false} noIcon></nys-toggle>
          </div>
        </div>
        <div className="nys-grid-row mb-2 sm:mb-4">
          <div className="nys-tablet:nys-grid-col-6">
            <div className="h-[34px] sm:h-[48px] mr-[10px] nys-display-flex items-center nys-tablet:nys-flex-justify-end">
              <label htmlFor='begin-datepicker' className={`input-label ${errors.show && (errors.emptyBeginDate || errors.futureBeginDate || errors.beginDateGreaterThanEndDate) && 'p-error'} ${(allDates || isGenerating || isSos) && 'p-disabled'}`}>Begin*</label>
            </div>
          </div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-datepicker
              label="test"
              showError={errors.show && (errors.emptyBeginDate || errors.futureBeginDate || errors.beginDateGreaterThanEndDate)}
              errorMessage={
                errors.show &&
                (errors.emptyBeginDate && "Begin date is required" ||
                  errors.futureBeginDate && "Future begin date is not allowed." ||
                  errors.beginDateGreaterThanEndDate && "Begin date must be before end date.") ||
                invalidDateError
              }
              ref={beginDatepickerRef}
              value={begin}
              disabled={allDates || isGenerating || isSos}
              width="full"
              id="begin-datepicker"
              name="begin-datepicker"
            ></nys-datepicker>
          </div>
        </div>
        <div className="nys-grid-row mb-2 sm:mb-4">
          <div className="nys-tablet:nys-grid-col-6">
            <div className="h-[34px] sm:h-[48px] mr-[10px] nys-display-flex items-center nys-tablet:nys-flex-justify-end">
              <label htmlFor='end-datepicker' className={`input-label ${errors.show && (errors.emptyEndDate || errors.futureEndDate || errors.endDateLessThanBeginDate) && 'p-error'} ${(allDates || isGenerating || isSos) && 'p-disabled'}`}>End*</label>
            </div>
          </div>
          <div className="nys-tablet:nys-grid-col-6">
            <nys-datepicker
              showError={errors.show && (errors.emptyEndDate || errors.futureEndDate || errors.endDateLessThanBeginDate)}
              errorMessage={
                errors.show &&
                (errors.emptyEndDate && "End date is required" ||
                  errors.futureEndDate && "Future end date is not allowed." ||
                  errors.endDateLessThanBeginDate && "End date must be after begin date.") ||
                invalidDateError
              }
              ref={endDatepickerRef}
              value={end}
              disabled={allDates || isGenerating || isSos}
              width="full"
              id="end-datepicker"
              name="end-datepicker"
              className={`${errors.show && errors.emptyEndDate && 'p-invalid'}`}
            ></nys-datepicker>
          </div>
        </div>
      </>}
      {docType === 'document' && <div className="nys-grid-row mb-2 sm:mb-4">
        <div className="nys-tablet:nys-grid-col-6">
          <div className="input-label h-[34px] sm:h-[48px] mr-[10px] nys-display-flex items-center nys-tablet:nys-flex-justify-end">
            <label htmlFor='select-notice' className={`input-label ${errors.show && errors.noticeMonthYear && 'p-error'} ${isGenerating && 'p-disabled'}`}>Month &amp; Year*</label>
          </div>
        </div>
        <div className="nys-tablet:nys-grid-col-6">
          <nys-select
            showError={errors.show && errors.noticeMonthYear}
            errorMessage={errors.show && errors.noticeMonthYear ? "Month & Year is required." : ""}
            ref={selectNoticeRef}
            id="select-notice"
            value={selectedNotice?.date}
            disabled={isGenerating}>
            {demoData.monthlyNotices.map((item, i) => {
              return <option key={i} value={item.value}>{item.label}</option>
            })}
          </nys-select>
        </div>
      </div>}
       <Message nysType='danger' className="error-response-message">No data found.</Message>
      {errors.errorResponse && <Message nysType='danger' className="error-response-message">An error occurred while processing the request.</Message>}
      {errors.serviceUnavailable && <Message nysType='danger' className="error-response-message">Service is not available.</Message>}

    <div className='nys-display-flex'>
        <nys-button className="nys-margin-r-200" onClick={clearForm} label="Clear" variant="outline" disabled={isGenerating} fullWidth></nys-button>
        <nys-button onClick={handleGenerate} label="Generate" disabled={isGenerating} fullWidth></nys-button>
      </div>
    </div>)
}

export default App
