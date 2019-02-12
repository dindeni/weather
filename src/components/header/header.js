import React from 'react';

import classes from './header.module.css';
import FormSearch from './formSearch/formSearch';

const header = ()=>{

        return(
            <header>
                <h1 className={classes.header__logo}>Weather</h1>
                <FormSearch/>
            </header>
        );
};

export default header;