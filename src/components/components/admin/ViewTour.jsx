import api from "../../../api/api"
import { useEffect, useState } from "react"
import Card from '../Card/Card'
const ViewTour = () => {
  const [tour, setTour] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const getTours = async ()=>{
     try {
      setLoading(true)
       const res = await api.post('/filter')  
       setLoading(false)
      setTour(res.data?.items)
     } catch (error) {
      console.log(error);
     }
    }
    getTours()
  }, [])
  const key = localStorage.getItem('secretKey')
  return <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     {loading && (<h1>loading</h1>)}
      {tour.map((item) => <Card key={item._id} tour={item} isAdminComponent={true} keyAdmin={key}/>)}
    </div>
  </>
}

export default ViewTour