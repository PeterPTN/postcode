import { setSuburbs, setSuburbView, resetSuburbUpdateForm } from '../../slices/suburb-slice'
import { useAppDispatch, useAppSelector } from '../../services/redux-services'
import { setError, setSuccess } from '../../slices/form-slice'
import { useEffect, useState } from 'react'
import { getAllSuburbs } from '../../services/suburb-services'
import { useQuery } from 'react-query'
import SuburbInformationContainer from '../../components/suburb-components/suburb-information/SuburbInformationContainer'
import CenteringContainer from '../../layouts/centering-container/CenteringContainer'
import CreateSuburbForm from '../../components/forms/create-suburb-form/CreateSuburbForm'
import UpdateSuburbForm from '../../components/forms/update-suburb-form/UpdateSuburbForm'
import SuccessMessage from '../../components/outcome-messages/success-message/SuccessMessage'
import SuburbEntity from '../../types/SuburbEntity'
import ErrorMessage from '../../components/outcome-messages/error-message/ErrorMessage'
import SuburbCard from '../../layouts/suburb-card/SuburbCard'
import styles from './AdminPage.module.scss'

const AdminPage = () => {
  const { data, isLoading } = useQuery<SuburbEntity[]>(["getAllSuburbs"], getAllSuburbs);
  const [viewCards, setViewCards] = useState<boolean>(true);
  const suburbViewArray = useAppSelector(state => state.suburb.suburbViewArray);
  const successMessage = useAppSelector(state => state.form.sucess);
  const errorMessages = useAppSelector(state => state.form.error);
  const suburbs = useAppSelector(state => state.suburb.suburbs);
  const dispatch = useAppDispatch();

  const handleViewClick = () => {
    dispatch(setError(null));
    dispatch(setSuccess(null));
    setViewCards(!viewCards);

    if (!viewCards) {
      dispatch(resetSuburbUpdateForm(true));
    }
  }

  useEffect(() => {
    if (data) {
      dispatch(setSuburbs(data));
      dispatch(setSuburbView(data?.map(suburb => {
        return { id: suburb.id, updateView: false }
      })));
    }
  }, [data])

  if (isLoading) {
    return (
      <CenteringContainer>
        <h2>Loading...</h2>
      </CenteringContainer>
    )
  } else {
    return (
      <CenteringContainer>
        <button className={styles.adminButton} onClick={handleViewClick}>
          {viewCards ? "Create Suburb" : "View Suburbs"}
        </button>

        {/* Outcome Messages */}
        {errorMessages && errorMessages.map((errorObj, index) => {
          return <ErrorMessage key={index} errorObj={errorObj} />
        })}
        {successMessage && <SuccessMessage successObj={successMessage} />}

        {viewCards && suburbViewArray.length > 0 && suburbs &&
          <>
            <h2 className={styles.title}>Suburb Information</h2>
            <p className={styles.tag}>All available suburbs in Australia.</p>
            <div className={styles.suburbCardContainer}>
              {suburbs.map((suburb: SuburbEntity, index) => {
                if (suburbViewArray[index].updateView) {
                  return (
                    <SuburbCard key={suburb.id}>
                      <UpdateSuburbForm {...suburb} />
                    </SuburbCard>
                  )
                }

                return (
                  <SuburbCard key={suburb.id}>
                    <SuburbInformationContainer {...suburb} />
                  </SuburbCard>
                )
              })}
            </div>
          </>
        }

        {!viewCards &&
          <>
            <h2 className={styles.title}>Create Suburb</h2>
            <p className={styles.tag}>Fill out the required fields to create a new suburb.</p>
            <CreateSuburbForm />
          </>
        }

      </CenteringContainer>
    )
  }
}

export default AdminPage;