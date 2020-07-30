import * as React from 'react';

interface propsType {
    isNav: boolean;
}

const Nav: React.FC<propsType> = ({isNav}) => {
    return (
        <></>
        // <>
        //     {
        //         isNav ?
        //             <div>
        //                 <div>프로필</div>
        //                 <div>hihi</div>
        //             </div> :
        //             null
        //     }
        // </>
    )
}

export default Nav;