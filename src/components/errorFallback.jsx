import { Link } from 'react-router-dom'
import './error.css'
import PropTypes from 'prop-types'

ErrorFallback.propTypes = {
    value:PropTypes.string
}

function ErrorFallback({value}) {
  return (
    <div className="container containers mt-5">
        <h2 className='h2 col'>404</h2>
        <h3 className='h3 col'>Oops, nothing here...</h3>
        <p className='p col'>Please Check the URL</p>
        <p className='p col'>Otherwise, <Link className='a' to={value=='doctor'?'/doctor/':value=='admin'?'/admin/':'/'}>Click here</Link> to redirect to homepage.</p>
    </div>
  )
}

export default ErrorFallback