import React, { useEffect, useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CIcon from '@coreui/icons-react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'

import { cilPencil, cilPlus } from '@coreui/icons';

const FormContact = React.lazy(() => import('../FormContact/FormContact'));
const FormNumber = React.lazy(() => import('../FormNumber/FormNumber'));

const Contact = () => {
  const [contactList, setContactList] = useState([])
  const [editForm, seteditForm] = useState(false)
  const [contactId, setContactId] = useState(0)
  const [contactForm, setContactForm] = useState({
    first_name : '',
    last_name : '',
    phones : [{ number : '' }]
  })

  const [numberContact, setNumberContact] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [numberModallVisible, setNumberModalVisible] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)
  const [pageOffset, setPageOffset] = useState(0)

  const getListContact = async (limit,offset) => {
    await axios.get(`http://localhost:4000/getcontact`, 
    {
      params: {
        "limit": limit,
        "offset" : offset
      }
    })
    .then((response) => {
      setContactList(response.data.data.contact)
    })
  }
   
  useEffect(() => {  
    getListContact(pageLimit,pageOffset);// eslint-disable-next-line 
  },[])

  const nextPage = () => {
    setPageNumber(pageNumber+1)
    setPageLimit(pageLimit)
    setPageOffset(pageOffset+10)
    getListContact(pageLimit,pageOffset+10)
  }

  const prevPage = () => {
    setPageNumber(pageNumber-1)
    setPageLimit(pageLimit)
    setPageOffset(pageOffset-10)
    getListContact(pageLimit,pageOffset-10);
  }

  const onAddContact = async () => {
    seteditForm(false)
    setModalVisible(!modalVisible)
  }

  const onEditContact = async (id) => {
    seteditForm(true)
    setContactId(id)
    let contacts = await contactList.find( i => i.id === id)
    setContactForm((contactForm) => (
        { 
            ...contactForm, 
            first_name: contacts.first_name,
            last_name: contacts.last_name,
            phones: contacts.phones,
    }))
    setModalVisible(!modalVisible)
  }

  const onAddNumber = async (id,number) => {
    setNumberModalVisible(!modalVisible)
    setContactId(id)
    seteditForm(false)
    setNumberContact(number)
  }

  const onEditNumber = async (id,number) => {
    setNumberModalVisible(!modalVisible)
    setContactId(id)
    seteditForm(true)
    setNumberContact(number)
  }

  const navigate = useNavigate();

  const openDeleteModal = (id) => {
    setDeleteModalVisible(true)
    setContactId(id)
  }

  const sumbmitDeleteContact = () => {
    axios.post(`http://localhost:4000/deletecontact`, {
        "id" : contactId
    })
    .then(() => {
        navigate('/');
    });
  }

  const onCloseModal = () => {
    setModalVisible(false)
    setContactForm((contactForm) => (
        { 
            ...contactForm, 
            first_name: '',
            last_name: '',
            phones: [{ number : '' }],
    }))
  }

  const onCloseNumberModal = () => {
    setNumberModalVisible(false)
    setContactId(0)
    seteditForm(false)
    setNumberContact('')
  }

  const onCloseDeleteModal = () => {
    setDeleteModalVisible(false)
  }
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Contacts List {' & '} Manage</CCardHeader>
            <CCardBody>
              <div className="d-grid mb-2 d-md-flex justify-content-md-end">
                <CButton color="primary" onClick={() => onAddContact()}>Add Contacts</CButton>
              </div>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>First Name</CTableHeaderCell>
                    <CTableHeaderCell>Last Name</CTableHeaderCell>
                    <CTableHeaderCell >Phones</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">/</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {contactList.map((contact) => {
                  return (
                    <CTableRow key={contact.id}>
                      <CTableHeaderCell scope="row">{contact.first_name}</CTableHeaderCell>
                      <CTableDataCell>{contact.last_name}</CTableDataCell>
                      <CTableDataCell>
                        {contact.phones.map((phone) => {
                          return (
                          <div key={phone.number}>{phone.number}
                            <CTooltip
                              content="Edit Number"
                              placement="top"
                            >
                              <CButton
                                className="ms-1 me-1 mb-1" 
                                color="warning"
                                variant="outline"
                                size="sm"
                                onClick={() => onEditNumber(contact.id,phone.number)}
                              >
                                <CIcon icon={cilPencil} size="sm"/>
                              </CButton>
                            </CTooltip>
                          </div>
                          )
                        })}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CTooltip
                          content="Add Phone Number"
                          placement="top"
                        >
                          <CButton
                            className="ms-1 me-1 mb-1" 
                            color="success"
                            variant="outline"
                            size="sm"
                            onClick={() => onAddNumber(contact.id,'')}
                          >
                            <CIcon icon={cilPlus} size="sm"/>
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CTooltip
                          content="Edit Contact"
                          placement="top"
                        >
                          <CButton
                              className="me-1 mb-1" 
                              color="success"
                              variant="outline"
                              size="sm"
                              onClick={() => onEditContact(contact.id)}
                          >
                              Edit
                          </CButton>
                        </CTooltip>
                        <CTooltip
                          content="Delete Contact"
                          placement="top"
                        >
                          <CButton 
                            className="me-1 mb-1"
                            color="danger"
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteModal(contact.id)}
                          >
                            Delete
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
                </CTableBody>
              </CTable>
              <div className="d-grid mt-2 d-md-flex justify-content-center">
                <CPagination aria-label="contact list pagination">
                    <CPaginationItem aria-label="previous page" onClick={() => prevPage()} disabled={pageNumber === 1}>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active>{pageNumber}</CPaginationItem>
                    <CPaginationItem aria-label="next page" onClick={() => nextPage()} disabled={contactList.length < 10}> 
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
            {
              editForm ? <CModalTitle>Edit Contact</CModalTitle> : <CModalTitle>Add New Contact</CModalTitle>
            }
        </CModalHeader>
        <CModalBody>
          <FormContact data={contactForm} isEdit={editForm} editId={contactId}/>
        </CModalBody>
        </CModal>
      </>

      <>
        <CModal visible={numberModallVisible} onClose={() => onCloseNumberModal()}>
        <CModalHeader onClose={() => onCloseNumberModal()}>
            {
              editForm ? <CModalTitle>Edit Number</CModalTitle> : <CModalTitle>Add New Number</CModalTitle>
            }
        </CModalHeader>
        <CModalBody>
          <FormNumber old_number={numberContact} isEdit={editForm} id={contactId}/>
        </CModalBody>
        </CModal>
      </>

      <>
        <CModal visible={deleteModalVisible} onClose={() => onCloseDeleteModal()}>
        <CModalHeader onClose={() => onCloseDeleteModal()}>
            <CModalTitle>Delete Contact</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="d-grid mt-2 d-md-flex justify-content-start">
            Are you sure to delete this contact?
          </div>
          <div className="d-grid mt-4 mb-2 d-md-flex justify-content-md-end">
            <CButton  color="danger" onClick={sumbmitDeleteContact}>Yes, Delete</CButton>
          </div>
        </CModalBody>
        </CModal>
      </>
    </>
  )
}

export default Contact
