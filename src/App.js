import {useState} from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import {FormLogin} from "./components/formOrder/FormLogin";
import {FormSignUp} from "./components/formOrder/FormSignUp";

function App() {
    const [isConnected, setIsConnected] = useState(false)

    const isConnectedHandler = () => {
        setIsConnected(previousIsConnected => !previousIsConnected)
        console.log('isConnected :' + isConnected)
    };

    const [cartIsShown, setCartIsShown] = useState(false);
    const CartHandler = () => {
        setCartIsShown(previous => !previous)
    };

    const [isRegistered, setIsRegistered] = useState(false)

    function registeredHandlers() {
        setIsRegistered(prevIsRegistered => !prevIsRegistered);
    }

    const [isSignUp, setIsSignUp] = useState(false)

    function signUpHandlers() {
        setIsRegistered(prevIsSignUp => !prevIsSignUp)
    }


    return (
        <CartProvider>
            {isSignUp && !isConnected && <FormSignUp onSignUpHandlers={signUpHandlers}></FormSignUp>}
            {isRegistered && !isConnected && <FormLogin onregisteredHandlers={registeredHandlers}
                                                        onIsConnectedHandler={isConnectedHandler}
                                                        isConnected={isConnected}
                                                        setIsConnected={setIsConnected}></FormLogin>}
            {cartIsShown && <Cart onClose={CartHandler}/>}

            <Header onShowCart={CartHandler}
                    onregisteredHandlers={registeredHandlers}
                    isRegistered={isRegistered}
                    onRegisteredHandlers={registeredHandlers}
                    onSignUpHandlers={signUpHandlers}
                    onIsConnectedHandler={isConnectedHandler}/>

            <main>

                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;
