import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import GoogleLogin from 'react-google-login'
import {useFormik} from 'formik'
import {useSelector,useDispatch} from 'react-redux'
import { registerUser , registerWithGoogle } from '../redux/actions/auth'

let Register = ()=>{
    
    let auth = useSelector(state=>state.auth)
    let dispatch = useDispatch()

     useEffect(()=>{
         return ()=>dispatch({type:'RESET'})
     },[dispatch])

    let validationSchema = yup.object({
        username:yup.string().required('username required').min(4,'minimum 4 chrectors required'),
        email:yup.string().required('email required').email('invalid email'),
        password:yup.string().required('password required').min(4,'minimum 4 charectors required'),
        confirmPassword:yup.string().required('required').oneOf([yup.ref('password')],'password mismatch')
    })

    let formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        validationSchema,
        onSubmit:values=>{
            dispatch(registerUser(values))
            }
    })

    const responseGoogle = (response) => {
         dispatch(registerWithGoogle(response.tokenId))
      }

    return(
        <div className="row">
    <div className=" offset-md-3 col-md-6 col-sm-12">
        <div className="container">
            <h2 className="text-center">Register form</h2>
    {auth?<div className={auth.success?"alert alert-success":"alert alert-danger"}>{auth.message}</div>:null}
    <GoogleLogin
    clientId="558511611530-rbj2k9ckicdn2og6b035r1gbbs6n22m2.apps.googleusercontent.com"
    buttonText="Signup with google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    />
    <small>Or</small>
            <form onSubmit={formik.handleSubmit}>
            <div className="input-group mb-3">
                <input type="text" name="username" className="form-control" placeholder="Enter username" {...formik.getFieldProps('username')}></input>
            </div>
            <small className="text-danger">{formik.touched.username && formik.errors.username?formik.errors.username:''}</small>
             <div className="input-group mb-3">
                <input type="text" name="email" className="form-control" placeholder="Enter Email" {...formik.getFieldProps('email')}></input>
            </div>
            <small className="text-danger">{formik.touched.email && formik.errors.email?formik.errors.email:''}</small>
            <div className="input-group mb-3">
                <input type="text" name="password" className="form-control" placeholder="Enter password" {...formik.getFieldProps('password')}></input>
            </div>
            <small className="text-danger">{formik.touched.password && formik.errors.password?formik.errors.password:''}</small>
            <div className="input-group mb-3">
                <input type="text" name="confirmPassword" className="form-control" placeholder="Confirm password" {...formik.getFieldProps('confirmPassword')}></input>
            </div>
            <small className="text-danger">{formik.touched.confirmPassword && formik.errors.confirmPassword?formik.errors.confirmPassword:''}</small>
            <br></br><button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Register</button>
            &nbsp;&nbsp;<Link to='/login' className="text-decoration-none">Login</Link>
            </form>
        </div>
    </div>
</div>
    )
}

export default Register