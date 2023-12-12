import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils';
import Auth from './Auth/Auth';
import Feed from './Feed/Feed';


export default function Home() {

  const userData = useSelector((state:any) => state.userReducer);

  return (
    <>
      {!isEmpty(userData) ? (
        <div className='container'>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  )
}
