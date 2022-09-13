import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const Contact = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [contactForm, setContactForm] = useState({
    first_name : '',
    last_name : '',
    phones : []
  })

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleChangeName = (e) => {
    setName(e.target.value)
    setPhoneName()
  }

  const setPhoneName = () => {
    setContactForm((contactForm) => (
        { 
            ...contactForm, 
            first_name: name.split(' ').length === 1 ? name.split(' ').slice(-1).join(' ') : name.split(' ').slice(0, -1).join(' '),
            last_name: name.split(' ').length === 1 ? '' : name.split(' ').slice(-1).join(' '),
    }))
  }

  const handleChangePhone = (e) => {
    setPhone(e.target.value)
    setPhoneNumber()
  }

  const setPhoneNumber = () => {
    setContactForm((contactForm) => (
        { 
            ...contactForm, 
            phones: [
                {
                    "number": phone
                }
            ]
    }))
  }

  const onCloseModal = () => {
    setModalVisible(false)
    setName('')
    setPhone('') 
    setContactForm((contactForm) => (
        { 
            ...contactForm, 
            first_name: '',
            last_name: '',
            phones: [],
    }))
  }

  const handleSubmitContact = () => {
    console.log(contactForm)
  }
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Contacts List {' & '} Manage</CCardHeader>
            <CCardBody>
              <div className="d-grid mb-2 d-md-flex justify-content-md-end">
                <CButton color="primary" onClick={() => setModalVisible(!modalVisible)}>Add Contacts</CButton>
              </div>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>First Name</CTableHeaderCell>
                    <CTableHeaderCell>Last Name</CTableHeaderCell>
                    <CTableHeaderCell >Phones</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">Mark</CTableHeaderCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>0812398129038<br/>0812398129038<br/>0812398129038</CTableDataCell>
                    <CTableDataCell className="text-center">
                        <CButton 
                            color="success"
                            onClick={() => setModalVisible(!modalVisible)}
                        >
                            Edit
                        </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <div className="d-grid mt-2 d-md-flex justify-content-center">
                <CPagination aria-label="contact list pagination">
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active>1</CPaginationItem>
                    <CPaginationItem>2</CPaginationItem>
                    <CPaginationItem>3</CPaginationItem>
                    <CPaginationItem aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <>
        <CModal visible={modalVisible} onClose={() => onCloseModal()}>
        <CModalHeader onClose={() => onCloseModal()}>
            <CModalTitle>Add New Phone</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm autoComplete='off'>
                <CFormInput
                    type="text"
                    id="contactName"
                    label="Name"
                    placeholder="Your Name"
                    text="Must be unique and does not have special character"
                    aria-describedby="contact-name"
                    value={name}
                    onChange={handleChangeName}
                />
                <CFormInput
                    type="text"
                    id="contactPhone"
                    label="Phone Number"
                    placeholder="Your Phone Number"
                    text="Must be greater than 8 characters long."
                    aria-describedby="contact-number"
                    value={phone}
                    onChange={handleChangePhone}
                />
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={() => onCloseModal()}>
            Close
            </CButton>
            <CButton color="primary" onClick={handleSubmitContact} >Save changes</CButton>
        </CModalFooter>
        </CModal>
      </>
    </>
  )
}

export default Contact
