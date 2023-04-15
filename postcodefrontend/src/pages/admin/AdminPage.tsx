import { getAllSuburbs } from '../../services/postcode-services'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { Suburb } from '../../types/Suburb'
import CenteringContainer from '../../layouts/CenteringContainer'
import CreateSuburbForm from '../../components/forms/create-suburb-form/CreateSuburbForm'
import SuburbCard from '../../components/suburb-components/suburb-card/SuburbCard'
import styles from './AdminPage.module.scss'

const AdminPage = () => {
  const [view, setView] = useState<boolean>(true);
  const { data, isLoading, isSuccess } = useQuery<Suburb[]>(["getAllSuburbs"], getAllSuburbs);

  const mockData: Suburb[] = [
    {
      id: 1,
      name: "Brisbane",
      population: "2000000",
      postcode: 4000
    },
    {
      id: 2,
      name: "Brisbane",
      population: "2000000",
      postcode: 4000
    },
    {
      id: 3,
      name: "Brisbane",
      population: "2000000",
      postcode: 4000
    },
    {
      id: 4,
      name: "Brisbane",
      population: "2000000",
      postcode: 4000
    },
  ]

  // View suburb information
  // Create suburb or postcode information

  if (isLoading) {
    return (
      <CenteringContainer>
        <h2>Loading...</h2>
      </CenteringContainer>
    )
  } else {
    return (
      <CenteringContainer>

        <button className={styles.adminButton} onClick={(() => setView(!view))}>{view ? "Create Suburb" : "View Suburbs"}</button>

        {view &&
          <>
            <h2>Suburb Information</h2>
            <div className={styles.suburbCardContainer}>
              {mockData.map((suburb: Suburb) => (
                <SuburbCard key={suburb.id} {...suburb} />
              ))}
            </div>
          </>
        }

        {!view &&
          <>
            <h2>Create Suburb</h2>
            <CreateSuburbForm />
          </>
        }

      </CenteringContainer>
    )
  }
}

export default AdminPage;