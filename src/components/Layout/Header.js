import { Fragment,useState } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';


const Header = (props) => {

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
          {!props.isRegistered && <><button onClick={props.onregisteredHandlers}>Connection</button> <button onClick={props.onregisteredHandlers}>Sign up !</button></>}
          {props.isRegistered && <button onClick={props.onSignUpHandlers}>disconnect</button>}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};
export default Header;

