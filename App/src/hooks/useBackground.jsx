import { useState, useEffect } from 'react'

import Who from "../assets/Backgrounds/Who.jpg";
import Errado from '../assets/Backgrounds/Errado4.png'
import Certo from '../assets/Backgrounds/Certo.jpg'

export const useBackground = () => {

    const [background, setBackground] = useState(Who);

    const ChangeWho = () => {
        setBackground(Who)
    }
    const ChangeErrado = () => {
        setBackground(Errado)
    }
    const ChangeCerto = () => {
        setBackground(Certo)
    }

    return{
        ChangeWho,
        ChangeErrado,
        ChangeCerto,
        background
    }
}