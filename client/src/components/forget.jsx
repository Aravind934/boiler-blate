import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import { forgetPassword } from '../redux/actions/auth'
import { useEffect } from 'react'

let Forget = ()=>{

  let dispatch = useDispatch()
  let auth = useSelector(state=>state.auth)

  useEffect(()=>{
    return ()=>dispatch({type:'RESET'})
},[dispatch])

  let formik = useFormik({
      initialValues:{
          email:''
      },
      onSubmit:values=>{
            dispatch(forgetPassword(values))
      }
  })

   return(
       <div className="row">
           <div className="offset-md-3 col-md-6 col-sm-12">
               <div className="container">
               {auth?<div className={auth.success?"alert alert-success":"alert alert-danger"}>{auth.message}</div>:null}
                   <form onSubmit={formik.handleSubmit}>
                   <h3>Forget password</h3>
                   <div className="input-group mb-3">
                <input type="text" name="email" className="form-control" placeholder="Enter email" {...formik.getFieldProps('email')}></input>
                   </div>
                <small className="text-danger">{formik.errors.email ? formik.errors.email:''}</small>
                   <br/>
                       <button type="submit" className="btn btn-primary">Submit</button>
                   </form>
               </div>
           </div>
       </div>
   )
}

export default Forget