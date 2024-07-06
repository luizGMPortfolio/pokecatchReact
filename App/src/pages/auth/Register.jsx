//css
import './auth.css'
//imports
import logo from '../../assets/Icones/LogoPokecatch.png'

//hooks
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';




//rewards
import {useFetchPokemons} from '../../hooks/useFetchPokemons';
import {useCloud} from '../../hooks/useCloud'
import {Time} from '../../hooks/useTime'



// eslint-disable-next-line react/prop-types
const Register = ({ setRewards }) => {

    const {RandonPokeball, RandonPokemon} = useFetchPokemons()
    const {createDocuments} = useCloud()

  const [displayName, setDisplayName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();  
  const { DiaAtual } = Time();

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])



  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("");

    const user = {
      displayName,
      email,
      password,
    }

    if (password !== ConfirmPassword) {
      setError('As senhas precisam ser iguais!');
      return
    }

    try {

      const res = await createUser(user)


    } catch (error) {
      console.log(error);
      setError(error.message);
    }

  };
  /*const handleGooglelogin = async () => {

    GoogleLogin()

    try {
      await location

      insertItens({
        pokemons: [],
        pokebolas: {
          pokebola: 5,
          great: 0,
          ultra: 0,
          master: 0
        },
        time: [],
        uid: res.uid,
        createdBy: res.displayName,
      });
      insertStatus({
        cards: 0,
        enconters: 0,
        legendary: 0,
        uid: res.uid,
        createdBy: res.displayName,
      });
      insertConfigs({
        locations: location,
        pokemons: [],
        BackCard: 'padrão',
        Date: DiaAtual,
        uid: res.uid,
        createdBy: res.displayName,
      })

      const NewRewards = {
        pokemon: pokemon,
        pokebolas: Rpokebolas
      }

      setRewards(NewRewards)

    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  } */

  return (

    <div className='auth'>

      <div className='logo'>
        <img src={logo} alt="" />
      </div>
      <div className='inputs'>
        <form onSubmit={handleSubmit}>
          <label>
            Usúario
            <input
              type="text"
              name='displayName'
              placeholder='Insira o nome de Usúario'
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)} />
          </label>
          <label>
            E-mail
            <input
              type="email"
              name='email'
              placeholder='Insira seu E-mail'
              required
              value={email}
              onChange={(e) => setemail(e.target.value)} />
          </label>
          <label>
            Senha
            <input
              type="password"
              name='password'
              placeholder='Crie sua senha'
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)} />
          </label>
          <label>
            <span>Confirmação de senha:</span>
            <input
              type="password"
              name='confirmPassword'
              required
              placeholder='Confirme a sua senha'
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {!loading &&
            <button className='btn-default'>Cadastrar</button>
          }
          {loading &&
            <button className='btn' disabled>Aguarde...</button>
          }
          {error && <p className='error'>{error}</p>}

        </form>
        <div className='register'>
          <Link to='/' className='btn-change'>Logar</Link>
        </div>
      </div>
      {/*<div className='outher'>
        <div className='division'>
          <hr />
          <span>ou</span>
          <hr />
        </div>
        <div className='google'>
          <span onClick={handleGooglelogin}><FcGoogle />Google</span>
        </div>
      </div> */}

    </div>


  )
}

export default Register