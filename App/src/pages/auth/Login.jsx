//css
import './auth.css'

//imports
import logo from '../../assets/Icones/LogoPokecatch.png'


//hooks
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');

    const { login, error: authError, loading } = useAuthentication();


    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("");

        const user = {
            email,
            password,
        }

        await login(user)

    };

    useEffect(() => {
        if (authError) {
            setError(authError)
        }

    }, [authError])


    return (
        <div className='auth kanit'>
            <div className='logo'>
                <img src={logo} alt="" />
            </div>
            <div className='inputs'>
                <form onSubmit={handleSubmit}>
                    <label>
                        E-mail
                        <input
                            type="email"
                            name='email'
                            required
                            placeholder='E-mail'
                            onChange={(e) => setemail(e.target.value)} />
                    </label>
                    <label>
                        Senha
                        <input
                            type="password"
                            name='password'
                            required
                            placeholder='senha'
                            onChange={(e) => setpassword(e.target.value)} />
                    </label>
                    {!loading &&
                        <button className='btn-default'>Login</button>
                    }
                    {loading &&
                        <button className='btn-default' disabled>Aguarde...</button>
                    }
                    {error && <p className='error'>{error}</p>}
                </form>
                <div className='register'>
                    <Link to='/register' className='btn-change'>Cadastrar-se</Link>
                </div>
                {error && <p className='error'>{error}</p>}
            </div>
            {/*<div className='outher'>
                <div className='division'>
                    <hr />
                    <span>ou</span>
                    <hr />
                </div>
                <div className='google'>
                    <span onClick={GoogleLogin}><FcGoogle />Google</span>
                </div>
            </div> */}



        </div>
    )
}

export default Login