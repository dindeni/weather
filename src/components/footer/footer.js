import React from 'react';

import classes from './footer.module.css';

const footer = ()=>{
    return(
        <div className={classes.container}>
            <div className={classes.design}>
                designed by
                <a className={classes.link}
                   href="https://www.freepik.com/free-photos-vectors/template">
                    freepik.com
                </a>
            </div>
            <div className={classes.author}>
                developed by
                <a href="https://github.com/dindeni" className={classes.link}>
                    D.Lagutin
                </a>
            </div>
        </div>


    )
};

export default footer;