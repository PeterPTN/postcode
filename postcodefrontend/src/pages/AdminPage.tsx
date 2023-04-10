import { getAllSuburbs } from '../services/postcode-services'
import { AdminViews } from '../types/AdminViews'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { Suburb } from '../types/Suburb'
import CenteringContainer from '../layouts/CenteringContainer'
import SuburbCard from '../components/suburbcard/SuburbCard'

const AdminPage = () => {
  const [returning, setReturning] = useState<AdminViews | null>(null);
  const { data } = useQuery<Suburb[]>(["getAllSuburbs"], getAllSuburbs)

  useEffect(() => {
    if (data) setReturning("view");
  }, [data])

  // View suburb information
  // Create suburb or postcode information

  if (!returning) {
    return (
      <CenteringContainer>
        <h2>Loading...</h2>
      </CenteringContainer>
    )
  } else if (returning === "view") {
    return (
      <CenteringContainer>
        <h2>Suburb Information</h2>
        <div>
          <button onClick={(() => setReturning("create"))}>create</button>
          <button onClick={(() => setReturning("edit"))}>edit</button>
        </div>

        {data?.map((suburb: Suburb) => (
          <SuburbCard key={suburb.id} name={suburb.name} population={suburb.population} postcode={suburb.postcode}/>
        ))}

      </CenteringContainer>
    )
  } else if (returning === "create") {
    return (
      <CenteringContainer>
        <h2>Create suburb or postcode</h2>
        <div>
          <button onClick={(() => setReturning("view"))}>view</button>
          <button onClick={(() => setReturning("edit"))}>edit</button>
        </div>

      </CenteringContainer>
    )
  } else if (returning === "edit") {
    return (
      <CenteringContainer>
        <h2>Edit suburb or postcode</h2>
        <div>
          <button onClick={(() => setReturning("view"))}>view</button>
          <button onClick={(() => setReturning("create"))}>create</button>
        </div>
      </CenteringContainer>
    )
  }

}

export default AdminPage