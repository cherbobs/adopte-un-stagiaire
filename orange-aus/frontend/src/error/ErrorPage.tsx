import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./ErrorAnimate.css"

export default function ErrorPage() {
    const [title, setTitle] = useState<boolean>(false);
    const [sousTitle, setSousTitle] = useState<boolean>(false);
    const [btn, setBtn] = useState<boolean>(false);

    const navigation = useNavigate();
    function handleClick() {
        navigation("/")
    }

    useEffect(() => {
        const timersError = [
            setTimeout(() => {
                setTitle(true);
            }, 1000),
            setTimeout(() => {
                setSousTitle(true)
            }, 2000),
            setTimeout(() => {
                setBtn(true)
            }, 3000),
        ]
        return () => timersError.forEach(timer => clearTimeout(timer))
    }, [])

    return (
        <div className='container'>
            <div>
                <img className='img' src="/assets/cat-revenge-animation-404-page.gif" alt="Error 404 cat-revenge"/>
                {
                    title && <h1 className='title'>Oh non, un chat curieux!</h1>
                }
                {
                    sousTitle && <p className='subtitle'>Il semble que cette page ait été prise en otage par M. le Chat.</p>
                }
                {
                    btn && <button className='btn' type="button" onClick={handleClick}> Attrape-le à l'accueil </button>
                }
            </div>
            
        </div>
    )
}