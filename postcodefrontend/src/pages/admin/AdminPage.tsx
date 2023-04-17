import { setSuburbs, setSuburbView, resetSuburbUpdateForm } from '../../slices/suburb-slice'
import { useAppDispatch, useAppSelector } from '../../services/redux-services'
import { useEffect, useState } from 'react'
import { getAllSuburbs } from '../../services/suburb-services'
import { useQuery } from 'react-query'
import CenteringContainer from '../../layouts/CenteringContainer'
import CreateSuburbForm from '../../components/forms/create-suburb-form/CreateSuburbForm'
import SuburbEntity from '../../types/SuburbEntity'
import SuburbCard from '../../components/suburb-components/SuburbCard'
import styles from './AdminPage.module.scss'
import UpdateSuburbForm from '../../components/forms/update-suburb-form/UpdateSuburbForm'
import SuburbInformationContainer from '../../components/suburb-components/suburb-information/SuburbInformationContainer'
import ErrorMessage from '../../components/forms/outcome-messages/ErrorMessage'
import SuccessMessage from '../../components/forms/outcome-messages/SuccessMessage'

const AdminPage = () => {
  const { data, isLoading } = useQuery<SuburbEntity[]>(["getAllSuburbs"], getAllSuburbs);
  const [viewCards, setViewCards] = useState<boolean>(true);
  const suburbViewArray = useAppSelector(state => state.suburb.suburbViewArray);
  const successMessage = useAppSelector(state => state.form.sucess);
  const errorMessage = useAppSelector(state => state.form.error);
  const suburbs = useAppSelector(state => state.suburb.suburbs);
  const dispatch = useAppDispatch();

  const handleViewClick = () => {
    setViewCards(!viewCards);

    if (!viewCards) {
      dispatch(resetSuburbUpdateForm(true));
    }
  }

  const mockData: SuburbEntity[] = [
    {
      id: 1,
      name: "Brisbane",
      population: 2000000,
      postcode: 4000
    },
    {
      id: 2,
      name: "Brisbane",
      population: 2000000,
      postcode: 4000
    },
    {
      id: 3,
      name: "Brisbane",
      population: 2000000,
      postcode: 4000
    },
    {
      id: 4,
      name: "Brisbane",
      population: 2000000,
      postcode: 4000
    },
  ]

  useEffect(() => {
    if (data) {
      dispatch(setSuburbs(data));
      dispatch(setSuburbView(mockData?.map(suburb => {
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

        {errorMessage && <ErrorMessage message={errorMessage} />}
        {successMessage && <SuccessMessage message={successMessage} />}
        {viewCards && suburbViewArray.length > 0 && suburbs &&
          <>
            <h2>Suburb Information</h2>
            <p>All available suburbs in Australia.</p>
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
            <h2>Create Suburb</h2>
            <p>Fill out the required fields to create a new suburb.</p>
            <CreateSuburbForm />
          </>
        }

      </CenteringContainer>
    )
  }
}

export default AdminPage;