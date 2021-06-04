import {useFormik} from 'formik'
import {Link , useHistory} from 'react-router-dom'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import GoogleLogin from 'react-google-login'
import * as yup from 'yup'
import { loginUser, loginWithGoogle } from '../redux/actions/auth'

let Login = ()=>{
    
    let auth = useSelector(state=>state.auth)
    let dispatch = useDispatch()
    let history = useHistory()

    useEffect(()=>{
        return ()=>dispatch({type:'RESET'})
    },[dispatch])

    let validationSchema = yup.object({
        email:yup.string().required('email required').email('invalid email'),
        password:yup.string().required('password required').min(4,'minimum 4 charectors required')
    })

    let formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema,
        onSubmit:values=>{
            dispatch(loginUser(values))
        }
    })
    
    if(auth.success){
       setTimeout(()=>{
        history.push('/home')
       },2000)
    }

    const responseGoogle = (response) => {
        dispatch(loginWithGoogle(response.tokenId))
     }

    return(
        <div className="row">
    <div className="offset-md-3 col-md-6 col-sm-12">
        <div className="container">
            <h2 className="text-center">Login form</h2>
            <form onSubmit={formik.handleSubmit}>
    {auth?<div className={auth.success?"alert alert-success":"alert alert-danger"}>{auth.message}</div>:null}

        <GoogleLogin
    clientId="558511611530-rbj2k9ckicdn2og6b035r1gbbs6n22m2.apps.googleusercontent.com"
    buttonText="Login with google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    />
    <small>Or</small>

             <div className="input-group mb-3">
                <input type="text" name="email" className="form-control" placeholder="Enter email" {...formik.getFieldProps('email')}></input><br></br>
            </div>
        <small className="text-danger">{formik.touched.email && formik.errors.email ? formik.errors.email :''}</small>
            <div className="input-group mb-3">
                <input type="text" name="password" className="form-control" placeholder="Enter password" {...formik.getFieldProps('password')}></input>
            </div>
            <small className="text-danger">{formik.touched.password && formik.errors.password ? formik.errors.password :''}</small>
            <br></br><button type="submit" className="btn btn-primary" disabled={!formik.isValid}>Login</button>
            &nbsp;&nbsp;<Link to='/register' className="text-decoration-none">Register</Link>
            &nbsp;&nbsp;<Link to="/forgetPassword" className="text-decoration-none">Forget password</Link>
            </form>
        </div>
    </div>
</div>
    )
}

export default Login